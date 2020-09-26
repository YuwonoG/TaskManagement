import {Task} from './task.entity';
import {Connection, EntityRepository, getConnection, Repository} from 'typeorm';
import { CreateTaskDTO } from './dto/createTask.dto';
import {TaskStatus} from './task-status.enum';
import { QueryTaskDTO } from './dto/queryTask.dto';
import { User } from 'src/auth/user.entity';
import { Category } from 'src/category/category.entity';
import { CategoryController } from 'src/category/category.controller';
import { CategoryRepository } from 'src/category/category.repository';

@EntityRepository(Task)
export class TaskRepository extends Repository<Task>{

    async createTask(createTaskDTO : CreateTaskDTO, user : User, connection : Connection):Promise<Task>{    

        const {title, description, categories} = createTaskDTO;
        categories.forEach((category, index) => {
            category.id = index;
            category.userId = user.id
        });
        const queryBuilder = connection.createQueryBuilder();
        await queryBuilder.useTransaction(true);
        await queryBuilder.insert()
                    .into(Category)
                    .values([...categories])
                    .execute();
        // const queryRunner = connection.createQueryRunner();
        
        await queryBuilder
                    .insert()
                    .into(Task)
                    .values([{
                        id : 1,
                        title : `"${title}"`,
                        description : `"${description}"`}
                    ])
                    .execute();
        // await queryRunner.connect();
        // try{
        //     // categories.forEach((category, index) => {
        //     //     category.id = index;
        //     //     category.userId = user.id
        //     // });
        //     queryRunner.startTransaction();

        //     await categories.map((category, index) =>
        //     {
        //         const cat = new Category();
        //         cat.id = index;
        //         cat.userId = user.id;
        //         cat.name = category.name;            
        //         cat.description = category.description;
        //         queryRunner.manager.save(cat);
        //     })
        //     await queryRunner.commitTransaction();
        //     queryRunner.startTransaction();

        //     task.id = 1;
        //     task.title = title;
        //     task.description = description;
        //     task.status = TaskStatus.OPEN;
        //     task.user = user;        
        //     task.categories = categories;

        //     await queryRunner.manager.save(task);
        //     delete task.user;

        //     await queryRunner.commitTransaction();
        // }   
        // catch(error){
        //     await queryRunner.rollbackTransaction();
        // }
        // finally{
        //     await queryRunner.release();
        // }
        

        // categories.forEach(category => {
        //     category.userId = user.id
        // });
        // await task.save();
  

        return null;
    }
    // async createTask(createTaskDTO : CreateTaskDTO, user : User):Promise<Task>{    

    //     const {title, description, categories} = createTaskDTO;


    //     const task = new Task();
    //     task.title = title;
    //     task.description = description;
    //     task.status = TaskStatus.OPEN;
    //     task.user = user;        

    //     categories.forEach(category => {
    //         category.userId = user.id
    //     });
    //     task.categories = categories;
    //     await task.save();
  

    //     delete task.user;
    //     return task;
    // }


    async getTasks(queryTaskDTO : QueryTaskDTO, user : User): Promise<Task[]>{
        const {search, status} = queryTaskDTO;
        const query = this.createQueryBuilder('task');
        // query.relation(Category, "categories");
        query.leftJoinAndSelect("task.categories", "category");
        query.where('task.userId = :userId', {userId : user.id});

        if (status){
            query.andWhere('task.status = :status', {status});
        }
        if (search){
            query.andWhere('task.title LIKE :search OR description LIKE :search', {search : `%${search}%` })
        }
        const tasks = await query.getMany();
        return tasks;
    }
}