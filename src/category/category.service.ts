import { Injectable } from '@nestjs/common';
import { CategoryRepository } from "./repository/category.repository";

@Injectable()
export class CategoryService {

  constructor(private readonly categoryRepository: CategoryRepository) {}

  async getAllCategories() {
    const categories = await this.categoryRepository.getAllCategories();
    return categories;
  }
}
