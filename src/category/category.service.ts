import { Injectable } from '@nestjs/common';
import { CategoryRepository } from "./repository/category.repository";

@Injectable()
export class CategoryService {

  constructor(private readonly categoryRepository: CategoryRepository) {}

  async getAllCategories() {
    const categories = await this.categoryRepository.getAllCategories();
    return categories;
  }

  async getCategoryById(id: number) {
   const category = await this.categoryRepository.getCategoryById(id);
   return category;
  }
}
