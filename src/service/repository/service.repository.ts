import { Injectable } from '@nestjs/common';
import { InjectRepository } from "@nestjs/typeorm";

import { Repository } from "typeorm";
import { ServiceEntity } from "../entity/service.entity";
import { CreateServiceDto } from "../dto/create.service.dto";

@Injectable()
export class ServiceRepository{

  constructor(@InjectRepository(ServiceEntity) private readonly ServiceModel: Repository<ServiceEntity>) {}

  async getAllService() {
    const services = this.ServiceModel.find();
    return services;
  }

  async getServiceById(id: number) {
    const service = await this.ServiceModel.findOne({
      where: {
        id: id
      }
    });
    return service;
  }

  async createService(info: CreateServiceDto) {
    const service = await this.ServiceModel.create({
      ...info
    });

    await this.ServiceModel.save(service);

    return service;
  }

  async updateService(id: number, info: CreateServiceDto) {
    const service = await this.ServiceModel.findOne({
      where: {
        id: id
      }
    })
    service.name = info.name;
    service.description = info.description;
    service.price = info.price;
    await this.ServiceModel.save(service);

    const service1 = await this.ServiceModel.findOne({
      where: {
        id: id
      }
    })
    return service;
  }

  async deleteService(id: number) {
    const service = await this.ServiceModel.findOne({
      where: {
        id: id
      }
    })

    await this.ServiceModel.remove(service);
  }

}
