import { Body, Controller, Get, Param, ParseIntPipe, Post, Req, Res, UseGuards } from "@nestjs/common";
import { Roles } from "../auth/roles-auth.decorator";
import { JwtAuthGuard } from "../auth/jwt-auth-guard";
import { RolesGuard } from "../auth/roles.guard";
import { CreateCategoryDto } from "./dto/create.category.dto";
import { CategoryService } from "./category.service";
import * as process from "process";
import { Request, Response } from "express";

@Controller('category')
export class CategoryController {

  constructor(private readonly categoryService: CategoryService) {}

  @Roles("ADMIN")
  @UseGuards(JwtAuthGuard, RolesGuard)
  @Post("/add/admin")
  async createCategory(@Req() req: Request,@Res() res: Response, @Body() info: CreateCategoryDto) {
    const category = await this.categoryService.createCategory(info);
    return res.redirect(`${process.env.BASE_URL}/admin/category`);
  }

}
