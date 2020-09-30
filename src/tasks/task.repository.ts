import {Task} from './task.entity';
import {DeleteResult, EntityRepository, Repository} from 'typeorm';
import { CreateTaskDTO } from './dto/createTask.dto';
import {TaskStatus} from './task-status.enum';
import { QueryTaskDTO } from './dto/queryTask.dto';
import { User } from 'src/auth/user.entity';
import { NotFoundException } from '@nestjs/common';



@EntityRepository(Task)
export class TaskRepository extends Repository<Task>{

    async createTask(createTaskDTO : CreateTaskDTO, user : User):Promise<Task>{

        const {title, description} = createTaskDTO;


        const task = new Task();
        task.title = title;
        task.description = description;
        task.status = TaskStatus.OPEN;
        task.user = user;
        console.log(user);
        await task.save();


        delete task.user;
        return task;
    }


    async getTasks(queryTaskDTO : QueryTaskDTO, user : User): Promise<Task[]>{
        const {search, status} = queryTaskDTO;
        const query = this.createQueryBuilder('task');

        // query.leftJoinAndSelect("task.user","user");
        query.where('task.user = :userParam', {userParam : user.id});

        if (status){
            query.andWhere('task.status = :status', {status});
        }
        if (search){
            query.andWhere('task.title LIKE :search OR description LIKE :search', {search : `%${search}%` })
        }
        const tasks = await query.getMany();
        // delete tasks.user;

        return tasks;
    }

    async deleteTask(id :number,  user : User):Promise<void>{
        //QueryBuilder tdk bisa relation
        let result : DeleteResult;
        const queryBuilder = this.createQueryBuilder("task")

        const task = await queryBuilder.select(["task.id"])
                                         .where("task.id = :idParam and task.user = :userParam", {idParam: id, userParam: user.id})
                                        .getOne();

        if (task)
        {
             result = await queryBuilder.delete()
                                .from(Task, "task")
                                .where("task.id =:idParam",{idParam : task.id})
                                .execute();
        }



        if (!result || result.affected === 0 )
        {
            throw new NotFoundException(`Task '${id}' is not found.`);
        }

        //menggunakan find
        // const result = await this.delete({id : id, user : user});
        // if (!result || result.affected === 0 )
        // {
        //     throw new NotFoundException(`Task '${id}' is not found.`);
        // }
        return  null;
    }
}