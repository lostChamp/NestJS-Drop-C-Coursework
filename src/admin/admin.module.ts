import { Module } from '@nestjs/common';
import { AdminService } from './admin.service';
import { AdminController } from "./admin.controller";
import { JwtModule } from "@nestjs/jwt";
import { UserModule } from "../user/user.module";
import { LotModule } from "../lot/lot.module";
import { OrderModule } from "../order/order.module";
import { ServiceModule } from "../service/service.module";
import { ManufacturerModule } from "../manufacturer/manufacturer.module";
import { CategoryModule } from "../category/category.module";
import { RoleModule } from "../role/role.module";

@Module({
  imports: [
    JwtModule,
    UserModule,
    LotModule,
    OrderModule,
    ServiceModule,
    ManufacturerModule,
    CategoryModule,
    RoleModule
  ],
  providers: [AdminService],
  controllers: [
    AdminController
  ]
})
export class AdminModule {}
