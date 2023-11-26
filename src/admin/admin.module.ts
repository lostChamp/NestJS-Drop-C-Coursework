import { Module } from '@nestjs/common';
import { AdminService } from './admin.service';
import { AdminController } from "./admin.controller";
import { JwtModule } from "@nestjs/jwt";
import { UserModule } from "../user/user.module";

@Module({
  imports: [
    JwtModule,
    UserModule
  ],
  providers: [AdminService],
  controllers: [
    AdminController
  ]
})
export class AdminModule {}
