import { Injectable } from '@nestjs/common';
import { ServiceRepository } from "./repository/service.repository";

@Injectable()
export class ServiceService {

  constructor(private readonly serviceRepository: ServiceRepository) {}

  async getAllServices() {
    const services = await this.serviceRepository.getAllService();
    return services;
  }

}
