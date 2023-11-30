import { forwardRef, Module } from "@nestjs/common";
import { OrderService } from './order.service';
import { OrderController } from './order.controller';
import { OrderEntity } from "./entity/order.entity";
import { TypeOrmModule } from "@nestjs/typeorm";
import { OrderRepository } from "./repository/order.repository";
import { JwtModule } from "@nestjs/jwt";
import { LotModule } from "../lot/lot.module";
import { ServiceModule } from "../service/service.module";

@Module({
  imports: [
    TypeOrmModule.forFeature([OrderEntity]),
    JwtModule,
    forwardRef(() => LotModule),
    forwardRef(() => ServiceModule)
  ],
  providers: [OrderService, OrderRepository],
  controllers: [OrderController],
  exports: [
    OrderService
  ]
})
export class OrderModule {}
