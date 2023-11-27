import { Module } from '@nestjs/common';
import { ProfileService } from './profile.service';
import { ProfileController } from "./profile.controller";
import { JwtModule } from "@nestjs/jwt";
import { UserModule } from "../user/user.module";
import { OrderModule } from "../order/order.module";

@Module({
  imports: [
    JwtModule,
    UserModule,
    OrderModule,
  ],
  controllers: [ProfileController],
  providers: [ProfileService]
})
export class ProfileModule {}
