import { Injectable } from "@nestjs/common";
import { InjectRepository } from "@nestjs/typeorm";
import { User } from "src/auth/user.entity";
import { CreateCategoryDTO } from "./dto/createCategory.dto";
import {CategoryRepository} from "./category.repository";
import { QueryCategoryDTO } from "./dto/queryCategory.dto";
import { Category } from "./category.entity";

@Injectable()
export class CategoryService{
    constructor(
            @InjectRepository(CategoryRepository)
            private categoryRepository : CategoryRepository,
        ){}

    async createCategory(createCategoryDTO : CreateCategoryDTO, user : User){
        return await this.categoryRepository.createCategory(createCategoryDTO, user);
    }

    async getCategories(queryTaskDTO : QueryCategoryDTO):Promise<Category[]>{
        return await this.categoryRepository.getCategories(queryTaskDTO);
    }

    async getCategoryById(queryTaskDTO : QueryCategoryDTO):Promise<Category[]>{
        return await this.categoryRepository.getCategories(queryTaskDTO);
    }
}