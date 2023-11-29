import { Body, Controller, Get, Param, ParseIntPipe, Post, Req, Res, UseGuards } from "@nestjs/common";
import { Request, Response } from "express";
import { JwtService } from "@nestjs/jwt";
import { ServiceService } from "./service.service";
import { OrderService } from "../order/order.service";
import { ServiceOrderDto } from "./dto/service-order.dto";
import * as process from "process";
import { JwtAuthGuard } from "../auth/jwt-auth-guard";
import { RolesGuard } from "../auth/roles.guard";
import { Roles } from "../auth/roles-auth.decorator";
import { CreateServiceDto } from "./dto/create.service.dto";

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
      role: token && token.roles === "ADMIN" ? "ADMIN" : null,
      service: services
    });
  }

  @Roles("ADMIN")
  @UseGuards(JwtAuthGuard, RolesGuard)
  @Post("/add/admin")
  async createService(@Res() res: Response,
                      @Body() info: CreateServiceDto) {
    const service = await this.serviceService.createService(info);
    return res.redirect(`${process.env.BASE_URL}/admin/service`);
  }

  @Roles("ADMIN")
  @UseGuards(JwtAuthGuard, RolesGuard)
  @Post("/edit/:id/admin")
  async updateService(@Res() res: Response,
                      @Body() info: CreateServiceDto,
                      @Param("id", ParseIntPipe) id: number) {
    const service = await this.serviceService.updateService(id, info);
    return res.redirect(`${process.env.BASE_URL}/admin/service`);
  }

  @Roles("ADMIN")
  @UseGuards(JwtAuthGuard, RolesGuard)
  @Get("/delete/:id")
  async deleteService(@Res() res: Response,
                      @Param("id", ParseIntPipe) id: number) {
    const service = await this.serviceService.deleteService(id);
    return res.redirect(`${process.env.BASE_URL}/admin/service`);
  }

  @Get("/:id")
  async getProductInfo(@Param("id", ParseIntPipe) id: number, @Req() req: Request, @Res() res: Response) {
    const service = await this.serviceService.getServiceById(id);
    const token = req.cookies.jwtToken ? this.jwtService.verify(req.cookies.jwtToken) : null;
    return res.render("service-order", {
      auth: token,
      role: token && token.roles === "ADMIN" ? "ADMIN" : null,
      service: service
    })
  }

  @Post("/order/gateway/:id")
  async serviceOrderGateway(@Param("id", ParseIntPipe) id: number, @Req() req: Request,
                            @Res() res: Response, @Body() info: ServiceOrderDto) {
    const token = req.cookies.jwtToken ? this.jwtService.verify(req.cookies.jwtToken) : null;
    if(token) {
      const order = await this.orderService.createServiceOrder(id, info, token.id);
      return res.redirect(`${process.env.BASE_URL}/home`);
    }
    return res.redirect(`${process.env.BASE_URL}/auth/sign-up`);
  }


}
