import { Controller, Get, Render, Res } from "@nestjs/common";
import {Response} from "express";


@Controller('/user')
export class UserController {

  @Get("/da")
  async sendDa(@Res() res: Response) {

  }

}
