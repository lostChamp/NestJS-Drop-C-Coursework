import { Injectable } from '@nestjs/common';
import { OrderRepository } from "./repository/order.repository";
import { ServiceOrderDto } from "../service/dto/service-order.dto";
import { CreateOrderDto } from "./dto/create.order.dto";

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

  async getFiveLastOrderForProfile(user_id: number) {
    const orders = await this.orderRepository.getFiveLastOrderForProfile(user_id);
    return orders;
  }

  async getOrderById(id: number) {
    const order = await this.orderRepository.getOrderById(id);
    return order;
  }

  async createOrder(info: CreateOrderDto) {
    const order = await this.orderRepository.createOrder(info);
    return order;
  }

  async updateOrder(id: number, info: CreateOrderDto) {
    const order = await this.orderRepository.updateOrder(id, info);
    return order;
  }

  async deleteOrder(id: number) {
    await this.orderRepository.deleteOrder(id);
  }
}
