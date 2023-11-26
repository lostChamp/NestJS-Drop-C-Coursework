import { Module } from '@nestjs/common';
import { OrderService } from './order.service';
import { OrderController } from './order.controller';
import { OrderEntity } from "./entity/order.entity";
import { TypeOrmModule } from "@nestjs/typeorm";
import { OrderRepository } from "./repository/order.repository";

@Module({
  imports: [
    TypeOrmModule.forFeature([OrderEntity])
  ],
  providers: [OrderService, OrderRepository],
  controllers: [OrderController],
  exports: [
    OrderService
  ]
})
export class OrderModule {}
