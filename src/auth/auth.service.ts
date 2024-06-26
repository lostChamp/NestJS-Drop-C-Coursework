import { forwardRef, HttpException, HttpStatus, Inject, Injectable, UnauthorizedException } from "@nestjs/common";
import {CreateUserDto} from "../user/dto/create.user.dto";
import * as bcrypt from "bcryptjs";
import {JwtService} from "@nestjs/jwt";
import {UserService} from "../user/user.service";
import {LoginDto} from "./dto/login.dto";
import { RoleService } from "../role/role.service";
@Injectable()
export class AuthService {

    constructor(@Inject(forwardRef(() => UserService))
                private userService: UserService,
                private jwtService: JwtService,
                private roleService: RoleService) {}

    async login(userDto: LoginDto) {
        const user = await this.validateUser(userDto);
        if(user.hasOwnProperty("error")) {
            return user;
        }
        return this.generateToken(user);
    }

    async registration(userDto: CreateUserDto) {
        const candidate = await this.userService.getUserByEmail(userDto.email);
        const role = await this.roleService.getRoleByValue("USER");
        if(candidate) {
            return {error: "Пользователь с таким mail существует", type: "email"}
        }
        if(userDto.repeat_password !== userDto.password) {
            return {error: "Пароли не совпадают", type: "password"}
        }
        const hashPassword = await bcrypt.hash(userDto.password, 5);
        const user = await this.userService.createUser({...userDto, password: hashPassword}, {role: role["id"]});
        return this.generateToken(user);
    }

    async generateToken(user) {
        const payload = {email: user.email, id: user.id, roles: user.role.value, name: user.full_name, profile: user.profile}
        return {
            token: this.jwtService.sign(payload)
        }
    }

    private async validateUser(userDto: LoginDto) {
        const user = await this.userService.getUserByEmail(userDto.email);
        if(!user) {
            return {error: "Неверный логин/пароль"}
        }
        const passwordEquals = await bcrypt.compare(userDto.password, user.password);
        if(user && passwordEquals) {
            return user;
        }
        return {error: "Неверный логин/пароль"}
    }
}
