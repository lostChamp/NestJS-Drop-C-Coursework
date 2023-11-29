import {
  Body,
  Controller,
  Get,
  Param,
  ParseIntPipe,
  Post,
  Req,
  Res,
  UploadedFile, UseGuards, UseInterceptors
} from "@nestjs/common";
import { Request, Response } from "express";
import { LotService } from "./lot.service";
import { JwtService } from "@nestjs/jwt";
import { ServiceOrderDto } from "../service/dto/service-order.dto";
import * as process from "process";
import { OrderService } from "../order/order.service";
import { FileInterceptor } from "@nestjs/platform-express";
import { JwtAuthGuard } from "../auth/jwt-auth-guard";
import { RolesGuard } from "../auth/roles.guard";
import { Roles } from "../auth/roles-auth.decorator";
import { CategoryService } from "../category/category.service";
import { ManufacturerService } from "../manufacturer/manufacturer.service";
import { CreateLotDto } from "./dto/create.lot.dto";

@Controller('lots')
export class LotController {

  constructor(private readonly lotService: LotService,
              private readonly jwtService: JwtService,
              private readonly orderService: OrderService,
              private readonly categoryService: CategoryService,
              private readonly manService: ManufacturerService) {}
  @Get("")
  async getProductLots(@Res() res: Response, @Req() req: Request) {
    const token = req.cookies.jwtToken ? this.jwtService.verify(req.cookies.jwtToken) : null;
    const lots = await this.lotService.getAllWareForUsers();
    return res.render("lots-product", {
      auth: token,
      role: token && token.roles === "ADMIN" ? "ADMIN" : null,
      lot: lots
    });
  }

  @Roles('ADMIN')
  @UseGuards(JwtAuthGuard, RolesGuard)
  @Post("/add/admin")
  @UseInterceptors(FileInterceptor('image'))
  async createLot(@UploadedFile() image: Express.Multer.File, @Body() info: CreateLotDto,
                  @Res() res: Response) {
    if(image === undefined) {
      info.image = "/images/noImage.jpg";
    }
    console.log(image);
    // const category = await this.categoryService.getCategoryByValue(info.category);
    // const man = await this.manService.getManByValue(info.man);
    // info.category = category.id;
    // info.man = man.id
    // const lot = await this.lotService.createLot(info);
    // return res.redirect(`${process.env.BASE_URL}/admin/ware`);
  }

  @Roles('ADMIN')
  @UseGuards(JwtAuthGuard, RolesGuard)
  @Post("/edit/:id/admin")
  async updateWare(@Res() res: Response, @Body() info,
                   @Param("id", ParseIntPipe) id: number) {
    const lot = await this.lotService.updateLot(id, info);
    return res.redirect(`${process.env.BASE_URL}/admin/ware`);
  }

  @Roles('ADMIN')
  @UseGuards(JwtAuthGuard, RolesGuard)
  @Get("/delete/:id")
  async deleteWare(@Res() res: Response, @Param("id", ParseIntPipe) id: number) {
    await this.lotService.deleteLot(id);
    return res.redirect(`${process.env.BASE_URL}/admin/ware`);
  }

  @Get("/:id")
  async getProductInfo(@Param("id", ParseIntPipe) id: number, @Req() req: Request, @Res() res: Response) {
    const lots = await this.lotService.getLotById(id);
    const token = req.cookies.jwtToken ? this.jwtService.verify(req.cookies.jwtToken) : null;
    return res.render("lots-order", {
      auth: token,
      role: token && token.roles === "ADMIN" ? "ADMIN" : null,
      lot: lots
    })
  }

  @Post("/order/gateway/:id")
  async lotsOrderGateway(@Param("id", ParseIntPipe) id: number, @Req() req: Request,
                            @Res() res: Response, @Body() info: ServiceOrderDto) {
    const token = req.cookies.jwtToken ? this.jwtService.verify(req.cookies.jwtToken) : null;
    if(token) {
      const order = await this.orderService.createProductOrder(id, info, token.id);
      return res.redirect(`${process.env.BASE_URL}/home`);
    }
    return res.redirect(`${process.env.BASE_URL}/auth/sign-up`);
  }
}
