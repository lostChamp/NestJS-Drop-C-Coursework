import { Controller, Get, Res } from "@nestjs/common";
import { Response } from "express";

@Controller('lots')
export class LotController {
  @Get("")
  async getProductLots(@Res() res: Response) {
    return res.render("lots-product");
  }
}
