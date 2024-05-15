import { Injectable } from '@nestjs/common';
import { InjectRepository } from "@nestjs/typeorm";
import { Repository } from "typeorm";
import { OrderEntity } from "../entity/order.entity";
import { ServiceOrderDto } from "../../service/dto/service-order.dto";
import { CreateOrderDto } from "../dto/create.order.dto";
import { WareEntity } from "../../lot/entity/ware.entity";

@Injectable()
export class OrderRepository {
  constructor(@InjectRepository(OrderEntity) private readonly OrderModel: Repository<OrderEntity>) {
  }

  async getAllOrders() {
    const orders = await this.OrderModel.find(
      {relations: ["user", "ware", "service"], order: {
          id: "DESC"
        }},
      );
    return orders;
  }

  async createServiceOrder(id: number, info: ServiceOrderDto, user_id: number) {
    const order = this.OrderModel.create({
      description: info.description,
      service: {
        id: id
      },
      status: "В обработке",
      user: {
        id: user_id
      },
      date: new Date(),
    });
    const newOrder = await this.OrderModel.save(
      order
    );
    return newOrder;
  }

  async createLotsOrder(ware: WareEntity, info: ServiceOrderDto, user_id: number) {
    const order = await this.OrderModel.create({
      description: info.description,
      status: "В обработке",
      user: {
        id: user_id
      },
      ware: [ware],
      date: new Date(),
    });
    const newOrder = await this.OrderModel.save(
      order
    );
    return newOrder;
  }

  async getFiveLastOrderForProfile(user_id: number) {
    const orders = await this.OrderModel.find({
      where: {
        user: {
          id: user_id
        },
      },
      relations: ["ware", "service"],
      take: 5,
      order: {
        id: "DESC"
      }
    })
    return orders;
  }

  async getOrderById(id: number) {
    const order = await this.OrderModel.findOne({
      where: {
        id: id
      },
      relations: ["user", "ware", "service"]
    });
    return order;
  }

  async createOrder(info: CreateOrderDto) {
      const order = await this.OrderModel.create({
        ...info,
        date: new Date()
      });
      await this.OrderModel.save(order);
      return order;
  }

  async updateOrder(id: number, info: object) {
      const order = await this.OrderModel.findOne({
        where: {
          id: id
        },
        relations: ["ware"],
      });
      Object.assign(order, info);
      await this.OrderModel.save(order);
      return order;
  }

}
