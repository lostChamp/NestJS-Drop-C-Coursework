import { Controller, Get, Res } from "@nestjs/common";
import { Response } from "express";

@Controller('services')
export class ServiceController {

  @Get("")
  async getProductService(@Res() res: Response) {
    return res.render("service-product");
  }

}
