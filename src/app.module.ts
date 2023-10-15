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
import { ServiceService } from './service/service.service';
import { ServiceModule } from './service/service.module';
import { ManufacturerModule } from './manufacturer/manufacturer.module';
import { ManufacturerService } from './manufacturer/manufacturer.service';
import { ManufacturerController } from './manufacturer/manufacturer.controller';
import { OrderModule } from './order/order.module';
import { ConfigModule } from '@nestjs/config';

@Module({
  imports: [
    ConfigModule.forRoot({ isGlobal: true }),
    AuthModule,
    UserModule,
    LotModule,
    RoleModule,
    ProfileModule,
    ServiceModule,
    ManufacturerModule,
    OrderModule,
  ],
  controllers: [
    AuthController,
    LotController,
    ProfileController,
    ManufacturerController,
  ],
  providers: [AuthService, ServiceService, ManufacturerService],
})
export class AppModule {}
