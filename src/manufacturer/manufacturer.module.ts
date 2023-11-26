import { Module } from '@nestjs/common';
import { TypeOrmModule } from "@nestjs/typeorm";
import { ManufacturerEntity } from "./entity/manufacturer.entity";
import { ManufacturerService } from "./manufacturer.service";
import { ManufacturerRepository } from "./repository/man.repository";
import { ManufacturerController } from "./manufacturer.controller";

@Module({
  imports: [
    TypeOrmModule.forFeature([ManufacturerEntity])
  ],
  controllers: [
    ManufacturerController
  ],
  providers: [
    ManufacturerService, ManufacturerRepository
  ],
  exports: [
    ManufacturerService
  ]
})
export class ManufacturerModule {}
