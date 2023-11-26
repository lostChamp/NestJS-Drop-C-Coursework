import { Injectable } from '@nestjs/common';
import { InjectRepository } from "@nestjs/typeorm";
import { Repository } from "typeorm";
import { OrderEntity } from "../entity/order.entity";

@Injectable()
export class OrderRepository {
  constructor(@InjectRepository(OrderEntity) private readonly OrderModel: Repository<OrderEntity>) {
  }

  async getAllOrders() {
    const orders = await this.OrderModel.find({relations: ["user", "ware", "service"]});
    return orders;
  }
}
