import { Injectable } from '@nestjs/common';
import { InjectRepository } from "@nestjs/typeorm";

import { Repository } from "typeorm";
import { ServiceEntity } from "../entity/service.entity";

@Injectable()
export class ServiceRepository{

  constructor(@InjectRepository(ServiceEntity) private readonly ServiceModel: Repository<ServiceEntity>) {}

  async getAllService() {
    const services = this.ServiceModel.find();
    return services;
  }

}
