import { Body, Controller, Post, Query, UseGuards, UsePipes, ValidationPipe, Get, Param } from '@nestjs/common';
import { AuthGuard } from '@nestjs/passport';
import { GetUser } from 'src/auth/decorator/get-user.decorator';
import { User } from 'src/auth/user.entity';
import { Category } from './category.entity';
import { CategoryService } from './category.service';
import { CreateCategoryDTO } from './dto/createCategory.dto';
import { QueryCategoryDTO } from './dto/queryCategory.dto';

@UseGuards(AuthGuard())
@Controller('category')
export class CategoryController {

    constructor(private readonly categoryService : CategoryService){}


    @Get()
    getCategories(@Query(ValidationPipe) queryCategoryDTO : QueryCategoryDTO, @GetUser() user: User):Promise<Category[]>{
        return this.categoryService.getCategories(queryCategoryDTO);
    }

    @Get('/:id')
    getCategoryById(@Param(ValidationPipe) queryCategoryDTO : QueryCategoryDTO): Promise<Category[]>{
        return this.categoryService.getCategoryById(queryCategoryDTO);
    }

    @UsePipes(ValidationPipe)
    @Post()
    createCategory(@Body() createCategoryDTO : CreateCategoryDTO, @GetUser() user: User): Promise<Category>{        
        console.log(JSON.stringify({createCategoryDTO}));
        return  this.categoryService.createCategory(createCategoryDTO, user);
    }
}
