import { Module } from '@nestjs/common';
import { ServiceController } from './service.controller';
import { ServiceEntity } from "./entity/service.entity";
import { TypeOrmModule } from "@nestjs/typeorm";
import { ServiceService } from "./service.service";
import { ServiceRepository } from "./repository/service.repository";

@Module({
  imports: [
    TypeOrmModule.forFeature([ServiceEntity])
  ],
  controllers: [ServiceController],
  providers: [ServiceService, ServiceRepository],
  exports: [
    ServiceService
  ]
})
export class ServiceModule {}
