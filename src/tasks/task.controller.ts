import { Controller, Get, Post, Body,Param, Patch, Delete, Query, UsePipes, ValidationPipe, ParseIntPipe, UseGuards } from "@nestjs/common";
import { TaskService } from "./task.service";
import { Task } from "./task.entity";
import { CreateTaskDTO } from "./dto/createTask.dto";
import { UpdateTaskDTO } from "./dto/updateTask.dto";
import { QueryTaskDTO } from "./dto/queryTask.dto";
import { TaskStatusValidationPipe } from "./pipes/taskStatusValidation.pipe";
import { AuthGuard } from "@nestjs/passport";
import { GetUser } from "src/auth/decorator/get-user.decorator";
import { User } from "src/auth/user.entity";



@Controller('tasks')
@UseGuards(AuthGuard())
export class TaskControler{
    constructor(private readonly taskService :TaskService){}


    @Get()
    getTasks(@Query(ValidationPipe) queryTaskDTO : QueryTaskDTO, @GetUser() user: User):Promise<Task[]>{
        return this.taskService.getTasks(queryTaskDTO, user);
    }

    @Get('/:id')
    getTaskById(@Param('id', ParseIntPipe) id : number,@GetUser() user: User): Promise<Task>{
        return this.taskService.getTaskById(id, user);
    }

    @UsePipes(ValidationPipe)
    @Post()
    createTask(@Body() createTaskDTO : CreateTaskDTO, @GetUser() user: User): Promise<Task>{        
        console.log(JSON.stringify({createTaskDTO}));
        return  this.taskService.createTask(createTaskDTO, user);
    }

    
    @Patch('/:id')
    updateTask(@Param('id', ParseIntPipe) id :number, @Body(TaskStatusValidationPipe) updateTaskDTO : UpdateTaskDTO, @GetUser() user : User  ): Promise <Task>{
        return this.taskService.updateTask(id, updateTaskDTO, user);
    }

    @Delete('/:id')
    deleteTask(@Param('id', ParseIntPipe) id :number, @GetUser() user : User): Promise<void>{
        return this.taskService.deleteTask(id, user);
    }
}