import { Injectable } from '@nestjs/common';
import { InjectRepository } from "@nestjs/typeorm";

import { Repository } from "typeorm";
import { ServiceEntity } from "../entity/service.entity";
import { CreateServiceDto } from "../dto/create.service.dto";

@Injectable()
export class ServiceRepository{

  constructor(@InjectRepository(ServiceEntity) private readonly ServiceModel: Repository<ServiceEntity>) {}

  async getAllService() {
    const services = this.ServiceModel.find({order: {
        id: "DESC"
      }});
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

  async getServiceByValue(value: string) {
    const service = await this.ServiceModel.findOne({
      where: {
        name: value
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

}
