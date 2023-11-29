import { Module } from '@nestjs/common';
import { TypeOrmModule } from "@nestjs/typeorm";
import { ManufacturerEntity } from "./entity/manufacturer.entity";
import { ManufacturerService } from "./manufacturer.service";
import { ManufacturerRepository } from "./repository/man.repository";
import { ManufacturerController } from "./manufacturer.controller";
import { JwtModule } from "@nestjs/jwt";

@Module({
  imports: [
    TypeOrmModule.forFeature([ManufacturerEntity]),
    JwtModule
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
