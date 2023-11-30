import { Module } from '@nestjs/common';
import { AuthController } from './auth/auth.controller';
import { AuthService } from './auth/auth.service';
import { AuthModule } from './auth/auth.module';
import { UserModule } from './user/user.module';
import { LotController } from './lot/lot.controller';
import { LotModule } from './lot/lot.module';
import { RoleModule } from './role/role.module';
import { ProfileController } from './profile/profile.controller';
import { ProfileModule } from './profile/profile.module';
import { ServiceModule } from './service/service.module';
import { ManufacturerModule } from './manufacturer/manufacturer.module';
import { ManufacturerController } from './manufacturer/manufacturer.controller';
import { OrderModule } from './order/order.module';
import { ConfigModule, ConfigService } from "@nestjs/config";
import { TypeOrmModule } from "@nestjs/typeorm";
import { UserEntity } from "./user/entity/user.entity";
import { ServiceEntity } from "./service/entity/service.entity";
import { RoleEntity } from "./role/entity/role.entity";
import { OrderEntity } from "./order/entity/order.entity";
import { ManufacturerEntity } from "./manufacturer/entity/manufacturer.entity";
import { WareEntity } from "./lot/entity/ware.entity";
import { CategoryModule } from './category/category.module';
import { CategoryEntity } from "./category/entity/category.entity";
import { UserController } from "./user/user.controller";
import { ServiceController } from "./service/service.controller";
import { OrderController } from "./order/order.controller";
import { CategoryController } from "./category/category.controller";
import { RoleController } from "./role/role.controller";
import { PagesController } from './pages/pages.controller';
import { PagesModule } from './pages/pages.module';
import { AdminController } from './admin/admin.controller';
import { AdminModule } from './admin/admin.module';
import { MulterModule } from "@nestjs/platform-express";

@Module({
  imports: [
    ConfigModule.forRoot({ isGlobal: true }),
    MulterModule.registerAsync({
      useFactory: () => ({
        dest: './public/images',
      }),
    }),
    TypeOrmModule.forRootAsync({
      useFactory: (configService: ConfigService) => ({
        type: 'postgres',
        host: configService.get('POSTGRES_HOST'),
        port: configService.get('POSTGRES_PORT'),
        database: configService.get('POSTGRES_DB'),
        username: configService.get('POSTGRES_USER'),
        password: configService.get('POSTGRES_PASSWORD'),
        entities: [
          UserEntity,
          ServiceEntity,
          RoleEntity,
          OrderEntity,
          ManufacturerEntity,
          WareEntity,
          CategoryEntity
        ],
        autoLoadEntities: true,
        synchronize: true,
      }),

      inject: [ConfigService],
    }),
    AuthModule,
    UserModule,
    LotModule,
    RoleModule,
    ProfileModule,
    ServiceModule,
    ManufacturerModule,
    OrderModule,
    CategoryModule,
    PagesModule,
    AdminModule,
  ],
  controllers: [
    AuthController,
    LotController,
    ProfileController,
    ManufacturerController,
    UserController,
    ServiceController,
    OrderController,
    CategoryController,
    RoleController,
    PagesController,
    AdminController,
  ],
})
export class AppModule {}
