import { Body, Controller, Get, Param, ParseIntPipe, Post, Req, Res, UseGuards } from "@nestjs/common";
import { ManufacturerService } from "./manufacturer.service";
import { Roles } from "../auth/roles-auth.decorator";
import { JwtAuthGuard } from "../auth/jwt-auth-guard";
import { RolesGuard } from "../auth/roles.guard";
import { Request, Response } from "express";
import { CreateManDto } from "./dto/create.man.dto";
import * as process from "process";

@Controller('man')
export class ManufacturerController {

  constructor(private readonly manService: ManufacturerService) {}

  @Roles("ADMIN")
  @UseGuards(JwtAuthGuard, RolesGuard)
  @Post("/add/admin")
  async createMan(@Res() res: Response,
                  @Body() info: CreateManDto) {
    const man = await this.manService.createMan(info);
    return res.redirect(`${process.env.BASE_URL}/admin/mans`);
  }

}
