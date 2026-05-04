import { Module } from '@nestjs/common';
import { PrismaModule } from '@/prisma/prisma.module';
import { BajasController } from './bajas.controller';
import { BajasService } from './bajas.service';

@Module({
  imports: [PrismaModule],
  controllers: [BajasController],
  providers: [BajasService],
  exports: [BajasService],
})
export class BajasModule {}