import {Body, Controller, Get, Post, Req, Res, Session} from "@nestjs/common";
import {Request, Response} from "express";
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
  async registerGateway(@Body() info: CreateUserDto, @Res() res: Response, @Session() session: Record<string, any>) {
    const newUser = await this.authService.registration(info);
    session.token = newUser;
    if(newUser) {
      return res.render("home");
    }
  }

  @Post("/login/gateway")
  async loginGateway(@Body() info: LoginDto, @Session() session: Record<string, any>, @Res() res: Response) {
    const token = await this.authService.login(info);
    session.token = token;
    if(token) {
      return res.render("home");
    }
  }

}
