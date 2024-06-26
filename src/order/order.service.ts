import { Injectable } from '@nestjs/common';
import { OrderRepository } from "./repository/order.repository";
import { ServiceOrderDto } from "../service/dto/service-order.dto";
import { CreateOrderDto } from "./dto/create.order.dto";
import { WareRepository } from "../lot/repository/ware.respository";
import { UserService } from "../user/user.service";

@Injectable()
export class OrderService {

  constructor(private readonly orderRepository: OrderRepository,
              private readonly lotRepository: WareRepository,
              private readonly userService: UserService) {}


  async getAllOrders() {
    const orders = await this.orderRepository.getAllOrders();
    return orders;
  }

  async createServiceOrder(id: number, info: ServiceOrderDto, user_id: number) {
    const order = await this.orderRepository.createServiceOrder(id, info, user_id);
    return order;
  }

  async createProductOrder(id: number, info: ServiceOrderDto, user_id: number) {
    const ware = await this.lotRepository.getLotById(id)
    const order = await this.orderRepository.createLotsOrder(ware, info, user_id);
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
    const user = await this.userService.getUserByEmail(info.user);
    info.user = user;
    const order = await this.orderRepository.createOrder(info);
    return order;
  }

  async updateOrder(id: number, info: object) {
    const order = await this.orderRepository.updateOrder(id, info);
    console.log(info);
    const statusesNotDec = ["Обработан", "Исполняется", "Выполнен", "Доставка"];

    if(info["status"] !== info["oldStatus"]) {
      if(info["status"] === "Забракован" && info["oldStatus"] !== "В обработке") {
        order["ware"].forEach(ware => {
          this.lotRepository.incrementItemQuantity(ware["id"]);
        });
      }else if((info["oldStatus"] === "В обработке" || info["oldStatus"] === "Забракован") && statusesNotDec.includes(info["status"])) {
        order["ware"].forEach(ware => {
          this.lotRepository.decrementItemQuantity(ware["id"]);
        });
      }else if(info["oldStatus"] !== "Забракован" && info["status"] === "В обработке") {
        order["ware"].forEach(ware => {
          this.lotRepository.incrementItemQuantity(ware["id"]);
        });
      }
    }

    return order;
  }

}
