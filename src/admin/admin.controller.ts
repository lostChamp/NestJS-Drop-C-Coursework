import { Controller, Get, Req, Res, UseGuards } from "@nestjs/common";
import { Roles } from "../auth/roles-auth.decorator";
import { RolesGuard } from "../auth/roles.guard";
import { JwtAuthGuard } from "../auth/jwt-auth-guard";
import { Request, Response } from "express";
import { JwtService } from "@nestjs/jwt";
import { UserService } from "../user/user.service";

@Controller('admin')
export class AdminController {

  constructor(private readonly jwtService: JwtService,
              private readonly userService: UserService) {}

  @Roles("ADMIN")
  @UseGuards(JwtAuthGuard, RolesGuard)
  @Get("")
  async adminPage(@Res() res: Response, @Req() req: Request) {
    const token = req.cookies.jwtToken ? this.jwtService.verify(req.cookies.jwtToken) : null;
    if(token) {
      return res.render("admin-main", {
        auth: token,
        role: token.roles === "ADMIN" && token.roles ? "ADMIN" : null,
      });
    }
  }

  @Roles("ADMIN")
  @UseGuards(JwtAuthGuard, RolesGuard)
  @Get("/users")
  async adminUsers(@Res() res: Response, @Req() req: Request) {
    const token = req.cookies.jwtToken ? this.jwtService.verify(req.cookies.jwtToken) : null;
    const people = await this.userService.getAllUsers();
    if(token) {
      return res.render("admin-users", {
        auth: token,
        role: token.roles === "ADMIN" && token.roles ? "ADMIN" : null,
        people: people,
      });
    }
  }
}
