import { Module } from '@nestjs/common';
import { UserService } from './user.service';
import { UserController } from './user.controller';
import { UserEntity } from "./entity/user.entity";
import { TypeOrmModule } from "@nestjs/typeorm";
import {UserRepository} from "./repository/user.repository";

@Module({
  imports: [
    TypeOrmModule.forFeature([UserEntity])
  ],
  providers: [UserService, UserRepository],
  controllers: [UserController],
  exports: [UserService]
})
export class UserModule {}
