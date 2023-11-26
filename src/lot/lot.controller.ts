import { Controller, Get, Res } from "@nestjs/common";
import { Response } from "express";
import { LotService } from "./lot.service";

@Controller('lots')
export class LotController {

  constructor(private readonly lotService: LotService) {}
  @Get("")
  async getProductLots(@Res() res: Response) {
    const lots = await this.lotService.getAllWareForUsers();
    return res.render("lots-product", {
      lot: lots
    });
  }
}
