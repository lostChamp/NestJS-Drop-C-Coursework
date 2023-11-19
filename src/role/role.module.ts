import { Module } from '@nestjs/common';
import { RoleService } from './role.service';
import { RoleController } from './role.controller';
import { RoleEntity } from "./entity/role.entity";
import { TypeOrmModule } from "@nestjs/typeorm";
import { RoleRepository } from "./repository/role.entity";

@Module({
  imports: [
    TypeOrmModule.forFeature([RoleEntity])
  ],
  providers: [RoleService, RoleRepository],
  controllers: [RoleController],
  exports: [
    RoleService
  ]
})
export class RoleModule {}
