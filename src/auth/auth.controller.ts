import { Body, Controller, Get, Post, Req, Res } from "@nestjs/common";
import { Response } from "express";
import { CreateUserDto } from "../user/dto/create.user.dto";
import { LoginDto } from "./dto/login.dto";
import {AuthService} from "./auth.service";

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
    console.log(info);
    return res.redirect("/auth/login");
  }

  @Get("login")
  async login(@Res() res: Response) {
    return res.render("login");
  }

  @Post("/register/gateway")
  async registerGateway(@Body() info: CreateUserDto, @Res() res: Response) {
    const newUser = await this.authService.registration(info);
    if(newUser) {
      return res.render("home");
    }
  }

  @Post("/login/gateway")
  async loginGateway(@Body() info: LoginDto) {
    return this.authService.login(info);
  }

}
