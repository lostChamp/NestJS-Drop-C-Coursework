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
        return res.render(`home`);
    }

    @Get("/auth/login/error")
    async loginError(@Res() res: Response) {
        res.render('login-error')
    }

    @Get("/auth/sign-up/error/email")
    async regErrorEmail(@Res() res: Response) {
        res.render('sign-up-error-email')
    }

    @Get("/auth/sign-up/error/password")
    async regErrorPassword(@Res() res: Response) {
        res.render('sign-up-error-passwords')
    }


    @Get("/done")
    async donePage(@Res() res: Response, @Req() req: Request) {
        const token = req.cookies.jwtToken ? this.jwtService.verify(req.cookies.jwtToken) : null;
        if(token) {
            return res.render("doneOrder", {
                auth: token,
                role: (token.roles === "ADMIN" || token.roles === "MASTER") && token.roles ? "ADMIN" : null,
            });
        }
        return res.render("doneOrder");
    }

}
