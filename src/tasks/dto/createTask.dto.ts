import {IsNotEmpty, MinLength, Contains, IsOptional} from "class-validator";

export class CreateTaskDTO{
    @IsNotEmpty()
    @MinLength(4, {message : "Title is too short"})
    title : string;

    
    @IsNotEmpty()
    @Contains('description')
    description : string;


}
