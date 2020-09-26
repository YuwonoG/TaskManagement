import { PipeTransform, ArgumentMetadata, BadRequestException, Injectable } from "@nestjs/common";
import { stat } from "fs";
import { TaskStatus } from "../task-status.enum";

@Injectable()
export class TaskStatusValidationPipe implements PipeTransform{
    
    transform(value: any, metadata : ArgumentMetadata){
        console.log(value);
        console.log(metadata);
        
        let { title, description, status } = value;

        // if (Object.keys(value).includes('status'))
        if(status)
        {
            // value = {'status': value['status'].toUpperCase()};

            // if (!this.isStatusValid(value))
            status = status.toUpperCase();
            console.log(`Status = ${status}`);
            if (!this.isStatusValid(status))
            {
                // throw new BadRequestException(`"${value['status']}" is an invalid status`);
                 throw new BadRequestException(`"${status}" is an invalid status`);
            }
            value.status = status;
        }
        else{
            console.log(`"${status}" is not type of TaskStatus`);
        }
        return value;
    }

    private isStatusValid(status : TaskStatus){
        console.log(`IsStatus ${status}`)
        return Object.values(TaskStatus).includes(status);
    }
}