import { Body, Controller, Get, Post, Req, Res } from "@nestjs/common";
import {Request, Response} from "express";
import { CreateUserDto } from "../user/dto/create.user.dto";
import { LoginDto } from "./dto/login.dto";
import {AuthService} from "./auth.service";
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
  async registerGateway(@Body() info: CreateUserDto, @Res() res: Response, @Req() req: Request) {
    const newUser = await this.authService.registration(info);
    if(newUser && !newUser.hasOwnProperty("error")) {
      const cookie = req.cookies.jwtToken;
      if (!cookie) {
        res.cookie('jwtToken', newUser["token"], { maxAge: 9000000, httpOnly: true });
      }
      return res.redirect(`${process.env.BASE_URL}/home`);
    }else {
      if(newUser["type"] === "password") {
        return res.redirect(`${process.env.BASE_URL}/auth/sign-up/error/password`);
      }

      if(newUser["type"] === "email") {
        return res.redirect(`${process.env.BASE_URL}/auth/sign-up/error/email`);
      }
    }
  }

  @Post("/login/gateway")
  async loginGateway(@Body() info: LoginDto, @Res() res: Response, @Req() req: Request) {
    const token = await this.authService.login(info);
    if(token && !token.hasOwnProperty("error")) {
      const cookie = req.cookies.jwtToken;
      if (!cookie) {
        res.cookie('jwtToken', token["token"], { maxAge: 9000000, httpOnly: true });
      }
      return res.redirect(`${process.env.BASE_URL}/home`);
    }else {
      return res.redirect(`${process.env.BASE_URL}/auth/login/error`);
    }
  }


}
