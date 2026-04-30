import { Injectable } from '@nestjs/common';
import { PrismaService } from '@/prisma/prisma.service';
import { CreateDeviceTypeDto, UpdateDeviceTypeDto } from './dto/create-device-type.dto';

@Injectable()
export class DeviceTypesService {
  constructor(private prisma: PrismaService) {}

  async create(createDeviceTypeDto: CreateDeviceTypeDto) {
    // return await this.prisma.deviceType.create({ data: createDeviceTypeDto });
    return { message: 'Tipo de dispositivo creado', data: createDeviceTypeDto };
  }

  async findAll() {
    // return await this.prisma.deviceType.findMany();
    return { message: 'Tipos de dispositivos obtenidos', data: [] };
  }

  async findOne(id: number) {
    // return await this.prisma.deviceType.findUnique({ where: { id } });
    return { message: 'Tipo de dispositivo obtenido', data: { id } };
  }

  async update(id: number, updateDeviceTypeDto: UpdateDeviceTypeDto) {
    // return await this.prisma.deviceType.update({ where: { id }, data: updateDeviceTypeDto });
    return { message: 'Tipo de dispositivo actualizado', data: updateDeviceTypeDto };
  }

  async remove(id: number) {
    // return await this.prisma.deviceType.delete({ where: { id } });
    return { message: 'Tipo de dispositivo eliminado' };
  }
}
