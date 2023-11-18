import { Module } from '@nestjs/common';
import {JwtModule} from "@nestjs/jwt";
import * as process from "process";
import {UserService} from "../user/user.service";
import {AuthController} from "./auth.controller";
import {AuthService} from "./auth.service";
import {UserModule} from "../user/user.module";
@Module({
    imports: [
        JwtModule.register({
            secret: process.env.SECRET_KEY || "SECRET",
            signOptions: {
                expiresIn: "24h"
            }
        }),
        UserModule
    ],
    controllers: [
        AuthController
    ],
    providers: [
        AuthService,
    ],
    exports: [
        JwtModule,
        AuthService
    ]
})
export class AuthModule {}
