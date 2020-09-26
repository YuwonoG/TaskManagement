import { Module } from '@nestjs/common';
import { TaskControler } from './task.controller';
import { TaskService } from './task.service';
import {TypeOrmModule} from '@nestjs/typeorm';
import  {TaskRepository} from './task.repository';
import { AuthModule } from 'src/auth/auth.module';

@Module({
    imports: [
      TypeOrmModule.forFeature([TaskRepository,]),
      AuthModule,
    ],
     controllers: [TaskControler],
     providers: [TaskService],
  })
export class TaskModule{

}