import { Controller, Get, Req, Res } from "@nestjs/common";
import { Request, Response } from "express";
import { JwtService } from "@nestjs/jwt";

@Controller('')
export class PagesController {
    constructor(private jwtService: JwtService) {}
    @Get('')
    async goHomePage(@Res() res: Response) {
        return res.redirect("home");
    }

    @Get("/exit")
    async exit(@Res() res: Response, @Req() req: Request) {
        const cookie = req.cookies;
        for (let prop in cookie) {
            if (!cookie.hasOwnProperty(prop)) {
                continue;
            }
            res.cookie(prop, '', {expires: new Date(0)});
        }
        return res.redirect("home");
    }

    @Get("/home")
    async homePage(@Res() res: Response, @Req() req: Request) {
        const token = req.cookies.jwtToken ? this.jwtService.verify(req.cookies.jwtToken) : null;
        if(token) {
            return res.render("home", {
                auth: token,
                role: (token.roles === "ADMIN" || token.roles === "MASTER") && token.roles ? "ADMIN" : null,
            });
        }
        return res.render("home");
    }

}
