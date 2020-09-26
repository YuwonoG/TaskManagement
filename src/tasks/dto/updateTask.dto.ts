import { TaskStatus } from "../task-status.enum";
import { IsIn } from "class-validator";

export class UpdateTaskDTO{
    title : string;
    description : string;
    
    @IsIn(Object.values(TaskStatus))
    status : TaskStatus;
}