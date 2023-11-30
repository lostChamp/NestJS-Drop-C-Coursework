import { forwardRef, Module } from "@nestjs/common";
import { LotController } from './lot.controller';
import { LotService } from './lot.service';
import { WareRepository } from "./repository/ware.respository";
import { TypeOrmModule } from "@nestjs/typeorm";
import { WareEntity } from "./entity/ware.entity";
import { JwtModule } from "@nestjs/jwt";
import { OrderModule } from "../order/order.module";
import { CategoryModule } from "../category/category.module";
import { ManufacturerModule } from "../manufacturer/manufacturer.module";


@Module({
  imports: [
    TypeOrmModule.forFeature([WareEntity]),
    JwtModule,
    forwardRef(() => OrderModule),
    CategoryModule,
    ManufacturerModule
  ],
  controllers: [LotController],
  providers: [LotService, WareRepository],
  exports: [
    LotService
  ]
})
export class LotModule {}
