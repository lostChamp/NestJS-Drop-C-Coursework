import { Body, Controller, Get, Post, Req, Res } from "@nestjs/common";
import { Response } from "express";
import { CreateUserDto } from "../user/dto/create.user.dto";
import { LoginDto } from "./dto/login.dto";

@Controller('auth')
export class AuthController {

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

  @Post("/login/gateway")
  async loginGateway(@Body() info: LoginDto) {
    console.log(info);
  }

}
