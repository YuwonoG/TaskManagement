import { TaskStatus } from "../task-status.enum";
import {IsOptional, IsIn} from "class-validator";

export class QueryTaskDTO{
    @IsOptional()
    search: string;

    @IsOptional()
    @IsIn(Object.values(TaskStatus))
    status: TaskStatus;
}