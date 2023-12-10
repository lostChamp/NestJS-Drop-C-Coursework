import { Injectable } from '@nestjs/common';
import { ServiceRepository } from "./repository/service.repository";
import { CreateServiceDto } from "./dto/create.service.dto";

@Injectable()
export class ServiceService {

  constructor(private readonly serviceRepository: ServiceRepository) {}

  async getAllServices() {
    const services = await this.serviceRepository.getAllService();
    return services;
  }

  async getServiceByValue(value: string) {
    const service = await this.serviceRepository.getServiceByValue(value);
    return service;
  }

  async getServiceById(id: number) {
    const service = await this.serviceRepository.getServiceById(id);
    return service;
  }

  async createService(info: CreateServiceDto) {
    const service = await this.serviceRepository.createService(info);
    return service;
  }
}
