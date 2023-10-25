import { Controller, Get, Res } from "@nestjs/common";
import { Response } from "express";

@Controller('auth')
export class AuthController {

  @Get("sign-up")
  async registration(@Res() res: Response) {
    return res.render("sign-up");
  }

  @Get("login")
  async login(@Res() res: Response) {
    return res.render("login");
  }

}
