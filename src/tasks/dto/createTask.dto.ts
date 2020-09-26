import {IsNotEmpty, MinLength, Contains, IsOptional} from "class-validator";
import { Category } from "src/category/category.entity";

export class CreateTaskDTO{
    @IsNotEmpty()
    @MinLength(4, {message : "Title is too short"})
    title : string;

    
    @IsNotEmpty()
    @Contains('description')
    description : string;

    @IsOptional()
    categories: Category[];
}
