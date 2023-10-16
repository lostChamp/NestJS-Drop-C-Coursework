import { Module } from '@nestjs/common';
import { RoleService } from './role.service';
import { RoleController } from './role.controller';
import { RoleEntity } from "./entity/role.entity";
import { TypeOrmModule } from "@nestjs/typeorm";

@Module({
  imports: [
    TypeOrmModule.forFeature([RoleEntity])
  ],
  providers: [RoleService],
  controllers: [RoleController]
})
export class RoleModule {}
