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

  @Roles("ADMIN")
  @UseGuards(JwtAuthGuard, RolesGuard)
  @Post("/edit/:id/admin")
  async updateCategory(@Req() req: Request,@Res() res: Response,
                       @Body() info: CreateCategoryDto,
                       @Param("id", ParseIntPipe) id: number) {
    const category = await this.categoryService.updateCategory(id, info);
    return res.redirect(`${process.env.BASE_URL}/admin/category`);
  }

  @Roles("ADMIN")
  @UseGuards(JwtAuthGuard, RolesGuard)
  @Get("/delete/:id")
  async deleteCategory(@Req() req: Request,@Res() res: Response,
                       @Param("id", ParseIntPipe) id: number) {
    await this.categoryService.deleteCategory(id);
    return res.redirect(`${process.env.BASE_URL}/admin/category`);
  }

}
