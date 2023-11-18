import {HttpException, HttpStatus, Injectable, UnauthorizedException} from '@nestjs/common';
import {CreateUserDto} from "../user/dto/create.user.dto";
import * as bcrypt from "bcryptjs";
import {JwtService} from "@nestjs/jwt";
import {UserService} from "../user/user.service";
import {LoginDto} from "./dto/login.dto";
@Injectable()
export class AuthService {

    constructor(private userService: UserService,
                private jwtService: JwtService) {}

    async login(userDto: LoginDto) {
        const user = await this.validateUser(userDto);
        return this.generateToken(user);
    }

    async registration(userDto: CreateUserDto) {
        const candidate = await this.userService.getUserByEmail(userDto.email);
        if(candidate) {
            throw new HttpException("Пользователь с таким mail существует", HttpStatus.BAD_REQUEST);
        }
        const hashPassword = await bcrypt.hash(userDto.password, 5);
        const user = await this.userService.createUser({...userDto, password: hashPassword});
        console.log(this.generateToken(user));
        return this.generateToken(user);
    }

    private async generateToken(user) {
        const payload = {email: user.email, id: user.id, roles: user.roles, profile: user.profile}
        return {
            token: this.jwtService.sign(payload)
        }
    }

    private async validateUser(userDto: LoginDto) {
        const user = await this.userService.getUserByEmail(userDto.email);
        const passwordEquals = await bcrypt.compare(userDto.password, user.password);
        if(user && passwordEquals) {
            return user;
        }
        throw new UnauthorizedException({message: "Неверный логин/пароль"});
    }
}
