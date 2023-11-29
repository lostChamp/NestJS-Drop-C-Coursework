import { Body, Controller, forwardRef, Get, Inject, Param, ParseIntPipe, Post, Render, Req, Res } from "@nestjs/common";
import { Request, Response } from "express";
import { UserService } from "./user.service";
import { JwtService } from "@nestjs/jwt";
import * as process from "process";
import { EditUserDto } from "./dto/edit.user.dto";
import { AuthService } from "../auth/auth.service";
import { EditPasswordDto } from "./dto/edit.password.dto";
import { Roles } from "../auth/roles-auth.decorator";
import { CreateUserDto } from "./dto/create.user.dto";
import { RoleService } from "../role/role.service";
import * as bcrypt from "bcryptjs";


@Controller('/user')
export class UserController {

  constructor(private readonly userService: UserService,
              private readonly roleService: RoleService,
              private readonly jwtService: JwtService,
              @Inject(forwardRef(() => AuthService))
              private readonly authService: AuthService
              ) {}

  @Roles("ADMIN")
  @Post("/create/admin")
  async createUserAdminPanel(@Res() res: Response, @Req() req: Request, @Body() info: CreateUserDto) {
    info["password"] = await bcrypt.hash(info["password"], 5);
    info["role"] = await this.roleService.getRoleByValue(info["role"]);
    const user = await this.userService.createUser(info, {role: info["role"]});
    return res.redirect(`${process.env.BASE_URL}/admin`);
  }

  @Get("/delete/account/:id")
  async deleteUser(@Param("id", ParseIntPipe) id: number,
                   @Res() res: Response, @Req() req: Request) {
    const token = req.cookies.jwtToken ? this.jwtService.verify(req.cookies.jwtToken) : null;
    if(token.id === id) {
      await this.userService.deleteUserById(id);
      const cookie = req.cookies;
      for (let prop in cookie) {
        if (!cookie.hasOwnProperty(prop)) {
          continue;
        }
        res.cookie(prop, '', {expires: new Date(0)});
      }
      return res.redirect(`${process.env.BASE_URL}/home`);
    }
    return res.render("profile-not-access", {
      auth: token,
      role: token && token.roles === "ADMIN" ? "ADMIN" : null,
    });
  }

  @Get("/edit/:id")
  async editProfile(@Res() res: Response, @Req() req: Request, @Param("id", ParseIntPipe) id: number) {
    const token = req.cookies.jwtToken ? this.jwtService.verify(req.cookies.jwtToken) : null;
    const user = await this.userService.getUserById(id);
    if(user.id === token.id) {
      return res.render("edit-profile-data", {
        auth: token,
        role: token && token.roles === "ADMIN" ? "ADMIN" : null,
        user: user
      })
    }
    return res.render("profile-not-access", {
      auth: token,
      role: token && token.roles === "ADMIN" ? "ADMIN" : null,
    });
  }

  @Get("/edit/password/:id")
  async editPassword(@Res() res: Response, @Req() req: Request, @Param("id", ParseIntPipe) id: number) {
    const token = req.cookies.jwtToken ? this.jwtService.verify(req.cookies.jwtToken) : null;
    return res.render("edit-password", {
      auth: token,
      role: token && token.roles === "ADMIN" ? "ADMIN" : null,
      id: id
    });
  }

  @Post("/edit/:id/complete")
  async editProfileComplete(@Res() res: Response, @Req() req: Request,
                            @Param("id", ParseIntPipe) id: number,
                            @Body() newInfo: EditUserDto) {
    const user = await this.userService.updateUserById(id, newInfo);
    const jwtToken = await this.authService.generateToken(user);
    const cookie = req.cookies.jwtToken;
    if (!cookie) {
      res.cookie('jwtToken', jwtToken["token"], { maxAge: 9000000, httpOnly: true });
    }else {
      for (let prop in cookie) {
        if (!cookie.hasOwnProperty(prop)) {
          continue;
        }
        res.cookie(prop, '', {expires: new Date(0)});
      }
      res.cookie('jwtToken', jwtToken["token"], { maxAge: 9000000, httpOnly: true });
    }
    return res.redirect(`${process.env.BASE_URL}/profile/${user.id}`);
  }

  @Post("/edit/password/:id/complete")
  async editPasswordComplete(@Res() res: Response, @Req() req: Request,
                             @Param("id", ParseIntPipe) id: number,
                             @Body() newInfo: EditPasswordDto) {
    if(newInfo.password === newInfo["passwordRepeat"]) {
      let user = await this.userService.updatePassword(newInfo, id);
      return res.redirect(`${process.env.BASE_URL}/profile/${user.id}`);
    }

  }

  @Roles("ADMIN")
  @Post("/edit/:id/admin")
  async adminEditUser(@Res() res: Response, @Req() req: Request,
                      @Param("id", ParseIntPipe) id: number,
                      @Body() newInfo: EditUserDto) {
    await this.userService.updateUserById(id, newInfo);
    return res.redirect(`${process.env.BASE_URL}/admin/users`);
  }

  @Roles("ADMIN")
  @Get("/delete/:id")
  async adminDeleteUser(@Res() res: Response, @Req() req: Request,
                        @Param("id", ParseIntPipe) id: number,) {
    await this.userService.deleteUserById(id);
    return res.redirect(`${process.env.BASE_URL}/admin/users`);
  }

}
