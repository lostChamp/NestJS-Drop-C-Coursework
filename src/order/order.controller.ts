import { Body, Controller, forwardRef, Get, Inject, Param, ParseIntPipe, Post, Res, UseGuards } from "@nestjs/common";
import { OrderService } from "./order.service";
import { Roles } from "../auth/roles-auth.decorator";
import { JwtAuthGuard } from "../auth/jwt-auth-guard";
import { RolesGuard } from "../auth/roles.guard";
import { Response } from "express";
import { CreateOrderDto } from "./dto/create.order.dto";
import { ServiceService } from "../service/service.service";
import { LotService } from "../lot/lot.service";

@Controller('order')
export class OrderController {

  constructor(private readonly orderService: OrderService,
              @Inject(forwardRef(() => ServiceService))
              private readonly serviceService: ServiceService,
              private readonly wareService: LotService) {}

  @Roles("ADMIN")
  @UseGuards(JwtAuthGuard, RolesGuard)
  @Post("/add/admin")
  async createOrder(@Res() res: Response, @Body() info: CreateOrderDto) {
    const service = await this.serviceService.getServiceByValue(info.service);
    if(service) {
      info.service = service.id;
      info.ware = null;
    }else {
      const ware = await this.wareService.getWareByValue(info.ware);
      info.ware = ware.id;
      info.service = null;
    }
    console.log(info);
    const order = await this.orderService.createOrder(info);
    return res.redirect(`${process.env.BASE_URL}/admin/orders`);
  }

  @Roles("ADMIN")
  @UseGuards(JwtAuthGuard, RolesGuard)
  @Post("/edit/:id/admin")
  async updateOrder(@Res() res: Response, @Body() info: CreateOrderDto,
                    @Param("id", ParseIntPipe) id: number) {
    const order = await this.orderService.updateOrder(id, info);
    return res.redirect(`${process.env.BASE_URL}/admin/orders`);
  }

  @Roles("ADMIN")
  @UseGuards(JwtAuthGuard, RolesGuard)
  @Get("/delete/:id")
  async deleteOrder(@Res() res: Response, @Param("id", ParseIntPipe) id: number) {
    const order = await this.orderService.deleteOrder(id);
    return res.redirect(`${process.env.BASE_URL}/admin/orders`);
  }

}
