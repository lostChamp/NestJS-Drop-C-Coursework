import { Body, Controller, Get, Post, Req, Res, Session, UseGuards } from "@nestjs/common";
import {Request, Response} from "express";
import { CreateUserDto } from "../user/dto/create.user.dto";
import { LoginDto } from "./dto/login.dto";
import {AuthService} from "./auth.service";
import { Roles } from "./roles-auth.decorator";
import { RolesGuard } from "./roles.guard";
import * as process from "process";

@Controller('auth')
export class AuthController {

  constructor(private readonly authService: AuthService) {}

  @Get("sign-up")
  async registration(@Res() res: Response) {
    return res.render("sign-up");
  }
  @Post("/sign-up/reg")
  async regUser(
    @Body() info: CreateUserDto,
    @Res() res: Response
  ) {
    return res.redirect("/auth/login");
  }

  @Get("login")
  async login(@Res() res: Response) {
    return res.render("login");
  }

  @Post("/register/gateway")
  async registerGateway(@Body() info: CreateUserDto, @Res() res: Response, @Session() session: Record<string, any>) {
    const newUser = await this.authService.registration(info);
    session.token = newUser["token"];
    if(newUser) {
      return res.redirect(`${process.env.BASE_URL}/home`);
    }
  }

  @Post("/login/gateway")
  async loginGateway(@Body() info: LoginDto, @Session() session: Record<string, any>, @Res() res: Response) {
    const token = await this.authService.login(info);
    session.token = token["token"];
    console.log(token);
    if(token) {
      return res.redirect(`${process.env.BASE_URL}/home`);
    }
  }

  @Roles("ADMIN")
  @UseGuards(RolesGuard)
  @Get("/admin")
  async admin() {

  }

}
