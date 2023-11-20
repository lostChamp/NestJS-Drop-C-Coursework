import { Module } from '@nestjs/common';
import {PagesController} from "./pages.controller";
import { JwtService } from "@nestjs/jwt";

@Module({
    controllers: [PagesController],
    providers: [JwtService]
})
export class PagesModule {
}
