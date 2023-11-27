import { Controller, Get, Req, Res } from "@nestjs/common";
import { Request, Response } from "express";
import { LotService } from "./lot.service";
import { JwtService } from "@nestjs/jwt";

@Controller('lots')
export class LotController {

  constructor(private readonly lotService: LotService,
              private readonly jwtService: JwtService) {}
  @Get("")
  async getProductLots(@Res() res: Response, @Req() req: Request) {
    const token = req.cookies.jwtToken ? this.jwtService.verify(req.cookies.jwtToken) : null;
    const lots = await this.lotService.getAllWareForUsers();
    return res.render("lots-product", {
      auth: token,
      role: token.roles === "ADMIN" && token.roles ? "ADMIN" : null,
      lot: lots
    });
  }
}
