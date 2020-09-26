import {IsOptional, IsIn} from "class-validator";

export class QueryCategoryDTO{
    @IsOptional()
    search: string;

    @IsOptional()
    id: string;
}