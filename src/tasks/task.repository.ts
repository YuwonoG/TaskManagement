import {Task} from './task.entity';
import {EntityRepository, Repository} from 'typeorm';
import { CreateTaskDTO } from './dto/createTask.dto';
import {TaskStatus} from './task-status.enum';
import { QueryTaskDTO } from './dto/queryTask.dto';
import { User } from 'src/auth/user.entity';


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
}