import { Body, Controller, Get, Param, ParseIntPipe, Post, Req, Res } from "@nestjs/common";
import { Request, Response } from "express";
import { LotService } from "./lot.service";
import { JwtService } from "@nestjs/jwt";
import { ServiceOrderDto } from "../service/dto/service-order.dto";
import * as process from "process";
import { OrderService } from "../order/order.service";

@Controller('lots')
export class LotController {

  constructor(private readonly lotService: LotService,
              private readonly jwtService: JwtService,
              private readonly orderService: OrderService) {}
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
