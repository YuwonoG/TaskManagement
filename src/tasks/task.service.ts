import { Injectable, NotFoundException } from '@nestjs/common';
import { TaskRepository } from './task.repository';
import { InjectRepository } from '@nestjs/typeorm';
import { Task } from './task.entity';

import {CreateTaskDTO} from './dto/createTask.dto'
import { UpdateTaskDTO } from './dto/updateTask.dto';
import { QueryTaskDTO } from './dto/queryTask.dto';
import { User } from 'src/auth/user.entity';
import { GetUser } from 'src/auth/decorator/get-user.decorator';
import { Connection } from 'typeorm';



@Injectable()
export class TaskService{
    constructor(
            @InjectRepository(TaskRepository)
            private taskRepository : TaskRepository,
            private connection : Connection,
        ){}
    

    async getTasks(queryTaskDTO : QueryTaskDTO, user : User):Promise<Task[]>{
        return await this.taskRepository.getTasks(queryTaskDTO, user);
    }

    // getQueriedTasks(queryTaskDTO : QueryTaskDTO): Task[]{
    //     const {search, status} = queryTaskDTO;
    //     let tasks = this.getAllTasks();
    //     if (status){
    //         tasks = tasks.filter ((task) => task.status === status );
    //     }

    //     if (search)
    //     {
    //         tasks = tasks.filter((task) => 
    //             task.title.includes(search) || 
    //             task.description.includes(search)
    //         );
    //     }
    //     return tasks;
    // }

    // getTaskById(id : string ){
    //     const found = this.tasks.find((task) => task.id === id);
    //     if (!found){
    //         throw new NotFoundException(`Task with ID "${id}" not found`);
    //     }
    //     return found;
    // }
    async getTaskById(id : number, user : User):Promise<Task>{
        console.log(id);
        // const found = await this.taskRepository.findOne({id});
        const found = await this.taskRepository.findOne({where : {id, userId : user.id}});

        if (!found){
            throw new NotFoundException(`Task with ID "${id}" not found`);
        }
        return found;
    }
    // createTask(createTaskDTO : CreateTaskDTO): Task{                
    //     const {title, description} = createTaskDTO;
    //     const newTask : Task = {id : uuidv4(), title, description, status : TaskStatus.OPEN};
    //     this.tasks.push(newTask);
    //     console.log(newTask);
    //     return newTask;
    // }
    async createTask(createTaskDTO : CreateTaskDTO, user : User):Promise<Task>{
        // return this.taskRepository.createTask(createTaskDTO, user);
        return this.taskRepository.createTask(createTaskDTO, user);

    }
    // updateTask(id: string, updateTaskDTO : UpdateTaskDTO): Task{
    //     const {title, description, status} = updateTaskDTO;
    //     const task = this.getTaskById(id);
    //     if (title){
    //         task.title = title;
    //     }

    //     if (description){
    //         task.description = description;
    //     }

    //     task.status = status;
    //     return task;
    // }
    async updateTask(id : number, updateTaskDTO: UpdateTaskDTO, user : User):Promise<Task>{
        const {title, description, status} = updateTaskDTO;
        const task = await this.getTaskById(id, user);
        if (title){
            task.title = title;
        }

        if (description){
            task.description = description;
        }

        task.status = status;
        await task.save();
        return task;
    }

    // deleteTask(id : string){
    //     const index = this.tasks.findIndex((task) => task.id === id);
    //     this.tasks.splice(index,1);
    // }

    async deleteTask(id :number, @GetUser() user : User):Promise<void>{
         return this.taskRepository.deleteTask(id, user);
      
    }

}