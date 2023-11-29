import { Injectable } from '@nestjs/common';
import { InjectRepository } from "@nestjs/typeorm";
import { Repository } from "typeorm";
import { CategoryEntity } from "../entity/category.entity";

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
}
