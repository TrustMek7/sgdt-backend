import { Module } from '@nestjs/common';
import { ConfigModule } from '@nestjs/config';
import { AppController } from './app.controller';
import { AppService } from './app.service';
import { PrismaModule } from './prisma/prisma.module';
import { AuthModule } from './auth/auth.module';
import { AreasModule } from './areas/areas.module';
import { DevicesModule } from './devices/devices.module';
import { DeviceTypesModule } from './device-types/device-types.module';
import { OfficesModule } from './offices/offices.module';
import { ReportsModule } from './reports/reports.module';
import { BajasModule } from './bajas/bajas.module';

@Module({
  imports: [
    ConfigModule.forRoot({
      isGlobal: true,
      envFilePath: '.env',
    }),
    PrismaModule,
    AuthModule,
    AreasModule,
    DevicesModule,
    DeviceTypesModule,
    OfficesModule,
    ReportsModule,
    BajasModule,
  ],
  controllers: [AppController],
  providers: [AppService],
})
export class AppModule {}
