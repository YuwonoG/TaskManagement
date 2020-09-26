
import {IsNotEmpty, MinLength, IsOptional} from "class-validator";

export class CreateCategoryDTO {
    @IsNotEmpty()
    @MinLength(4, {message : "Name is too short"})
    name : string;

    @IsOptional()
    description : string;
}
