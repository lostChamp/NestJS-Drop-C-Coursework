import { Controller, Get, Param, ParseIntPipe, Req, Res } from "@nestjs/common";
import { Request, Response } from "express";
import { JwtService } from "@nestjs/jwt";
import { UserService } from "../user/user.service";
import { OrderService } from "../order/order.service";

@Controller('profile')
export class ProfileController {
  constructor(private readonly jwtService: JwtService,
              private readonly userService: UserService,
              private readonly orderService: OrderService) {}

  @Get("/:id")
  async profilePage(@Res() res: Response, @Req() req: Request, @Param("id", ParseIntPipe) id: number) {
    const token = req.cookies.jwtToken ? this.jwtService.verify(req.cookies.jwtToken) : null;
    const user = await this.userService.getUserById(id);
    const orders = await this.orderService.getFiveLastOrderForProfile(id);
    for(let i = 0; i < orders.length; i++) {
      orders[i]["ruDate"] = (orders[i].date.toLocaleString("ru"));
    }
    if(user) {
      return res.render("profile", {
        auth: token,
        role: (token.roles === "ADMIN" || token.roles === "MASTER") ? "ADMIN" : null,
        user: user,
        selfAccount: token && id === token.id,
        orders: orders,
      });
    }
    return res.render("profile-not-found", {
      auth: token,
      role: token && token.roles === "ADMIN" ? "ADMIN" : null,
    });
  }


}
