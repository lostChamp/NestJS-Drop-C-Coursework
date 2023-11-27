import { Injectable } from '@nestjs/common';
import { OrderRepository } from "./repository/order.repository";
import { ServiceOrderDto } from "../service/dto/service-order.dto";

@Injectable()
export class OrderService {

  constructor(private readonly orderRepository: OrderRepository) {}


  async getAllOrders() {
    const orders = await this.orderRepository.getAllOrders();
    return orders;
  }

  async createServiceOrder(id: number, info: ServiceOrderDto, user_id: number) {
    const order = await this.orderRepository.createServiceOrder(id, info, user_id);
    return order;
  }

  async createProductOrder(id: number, info: ServiceOrderDto, user_id: number) {
    const order = await this.orderRepository.createLotsOrder(id, info, user_id);
    return order;
  }
}
