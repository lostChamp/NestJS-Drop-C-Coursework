import { forwardRef, Module } from "@nestjs/common";
import { UserService } from './user.service';
import { UserController } from './user.controller';
import { UserEntity } from "./entity/user.entity";
import { TypeOrmModule } from "@nestjs/typeorm";
import {UserRepository} from "./repository/user.repository";
import { JwtModule } from "@nestjs/jwt";
import { AuthModule } from "../auth/auth.module";
import { RoleModule } from "../role/role.module";

@Module({
  imports: [
    TypeOrmModule.forFeature([UserEntity]),
    JwtModule,
    forwardRef(() => AuthModule),
    RoleModule
  ],
  providers: [UserService, UserRepository],
  controllers: [UserController],
  exports: [UserService]
})
export class UserModule {}
