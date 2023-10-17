import {Controller, Get, Redirect, Res} from '@nestjs/common';
import {Response} from "express";

@Controller('')
export class PagesController {
    @Get('')
    async goHomePage(@Res() res: Response) {
        return res.redirect("home");
    }

    @Get("/home")
    async homePage(@Res() res: Response) {
        return res.render("home");
    }
}
