import { Injectable } from '@nestjs/common';
import { CategoryRepository } from "./repository/category.repository";
import { CreateCategoryDto } from "./dto/create.category.dto";

@Injectable()
export class CategoryService {

  constructor(private readonly categoryRepository: CategoryRepository) {}

  async getAllCategories() {
    const categories = await this.categoryRepository.getAllCategories();
    return categories;
  }

  async getCategoryByValue(value: string|number) {
    const category = await this.categoryRepository.getCategoryByValue(value);
    return category;
  }

  async getCategoryById(id: number) {
   const category = await this.categoryRepository.getCategoryById(id);
   return category;
  }

  async createCategory(info: CreateCategoryDto) {
    const category = await this.categoryRepository.createCategory(info);
    return category;
  }

  async updateCategory(id: number, info: CreateCategoryDto) {
    const category = await this.categoryRepository.updateCategory(id, info);
    return category;
  }

  async deleteCategory(id: number) {
    await this.categoryRepository.deleteCategory(id);
  }
}
