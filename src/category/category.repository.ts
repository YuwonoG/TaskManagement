import { EntityRepository, Repository, getConnection } from "typeorm";
import { User } from "../auth/user.entity";
import { Category } from "./category.entity";
import {CreateCategoryDTO} from "./dto/createCategory.dto"
import { QueryCategoryDTO } from "./dto/queryCategory.dto";

@EntityRepository(Category)
export class CategoryRepository extends Repository<Category>{
    async createCategory(createCategoryDTO : CreateCategoryDTO, user: User): Promise<Category>{
        let result;
        const queryRunner = getConnection().createQueryRunner();
        await queryRunner.connect();
        await queryRunner.startTransaction();
        try{
            const {name, description} = createCategoryDTO;
            const category = new Category();
            category.name = name;
            category.description = description;    
            category.userId = user.id;
            
            // // delete task.user;
             result = await queryRunner.manager.save(category);
            await queryRunner.commitTransaction();

        }
        catch(error){
            await queryRunner.rollbackTransaction();
        }
        finally{
            await queryRunner.release();
        }
        
        // const {name, description} = createCategoryDTO;
        // const category = new Category();
        // category.name = name;
        // category.description = description;    
        // category.userId = user.id;
        // await category.save();
        return result;

    }

    async getCategories(queryCategoryDTO : QueryCategoryDTO): Promise<Category[]>{
        const {search, id} = queryCategoryDTO;
        const query = this.createQueryBuilder('category');
        query.leftJoinAndSelect("category.tasks", "task");
        
        if(id)
        {
            query.where('category.id = :id', {id});            
        }

        if (search){
            query.andWhere('category.name LIKE :search OR description LIKE :search', {search : `%${search}%` });
        }
        const categories = await query.getMany();
        return categories;
    }
}