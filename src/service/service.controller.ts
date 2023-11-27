import { Body, Controller, Get, Param, ParseIntPipe, Post, Req, Res } from "@nestjs/common";
import { Request, Response } from "express";
import { JwtService } from "@nestjs/jwt";
import { ServiceService } from "./service.service";
import { OrderService } from "../order/order.service";
import { ServiceOrderDto } from "./dto/service-order.dto";
import * as process from "process";

@Controller('services')
export class ServiceController {

  constructor(private readonly jwtService: JwtService,
              private readonly serviceService: ServiceService,
              private readonly orderService: OrderService) {}

  @Get("")
  async getProductService(@Res() res: Response, @Req() req: Request) {
    const token = req.cookies.jwtToken ? this.jwtService.verify(req.cookies.jwtToken) : null;
    const services = await this.serviceService.getAllServices();
    return res.render("service-product", {
      auth: token,
      role: token.roles === "ADMIN" && token.roles ? "ADMIN" : null,
      service: services
    });
  }

  @Get("/:id")
  async getProductInfo(@Param("id", ParseIntPipe) id: number, @Req() req: Request, @Res() res: Response) {
    const service = await this.serviceService.getServiceById(id);
    const token = req.cookies.jwtToken ? this.jwtService.verify(req.cookies.jwtToken) : null;
    return res.render("service-order", {
      auth: token,
      role: token.roles === "ADMIN" && token.roles ? "ADMIN" : null,
      service: service
    })
  }

  @Post("/order/gateway/:id")
  async serviceOrderGateway(@Param("id", ParseIntPipe) id: number, @Req() req: Request,
                            @Res() res: Response, @Body() info: ServiceOrderDto) {
    const token = req.cookies.jwtToken ? this.jwtService.verify(req.cookies.jwtToken) : null;
    const order = await this.orderService.createServiceOrder(id, info, token.id);
    return res.redirect(`${process.env.BASE_URL}/home`);
  }


}
