import { Module } from '@nestjs/common';
import { CategoryController } from './category.controller';
import { CategoryService } from './category.service';
import { CategoryRepository } from "./repository/category.repository";
import { TypeOrmModule } from "@nestjs/typeorm";
import { CategoryEntity } from "./entity/category.entity";
import { JwtModule } from "@nestjs/jwt";

@Module({
  imports: [
    TypeOrmModule.forFeature([CategoryEntity]),
    JwtModule
  ],
  controllers: [CategoryController],
  providers: [CategoryService, CategoryRepository],
  exports: [
    CategoryService
  ]
})
export class CategoryModule {}
