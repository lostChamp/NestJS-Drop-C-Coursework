import { Injectable } from '@nestjs/common';
import { InjectRepository } from "@nestjs/typeorm";
import { Repository } from "typeorm";
import { CategoryEntity } from "../entity/category.entity";
import { CreateCategoryDto } from "../dto/create.category.dto";

@Injectable()
export class CategoryRepository {
  constructor(@InjectRepository(CategoryEntity) private readonly CategoryModel: Repository<CategoryEntity>) {
  }

  async getAllCategories() {
    const categories = await this.CategoryModel.find();
    return categories;
  }

  async getCategoryById(id: number) {
    const category = await this.CategoryModel.findOne({where: {
      id: id
      }});
    return category
  }

  async getCategoryByValue(value: string|number) {
    const category = await this.CategoryModel.findOne({
      where: {
        name: value.toString()
      }
    })
    return category;
  }

  async createCategory(info: CreateCategoryDto) {
    const category = await this.CategoryModel.create({
      ...info
    })
    await this.CategoryModel.save(category);
    return category;
  }
}
