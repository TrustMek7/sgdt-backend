import { Injectable } from '@nestjs/common';
import { PrismaService } from '@/prisma/prisma.service';
import { CreateDeviceDto, UpdateDeviceDto } from './dto/create-device.dto';

@Injectable()
export class DevicesService {
  constructor(private prisma: PrismaService) {}

  async create(createDeviceDto: CreateDeviceDto) {
    // return await this.prisma.device.create({ data: createDeviceDto });
    return { message: 'Dispositivo creado', data: createDeviceDto };
  }

  async findAll() {
    // return await this.prisma.device.findMany();
    return { message: 'Dispositivos obtenidos', data: [] };
  }

  async findOne(id: number) {
    // return await this.prisma.device.findUnique({ where: { id } });
    return { message: 'Dispositivo obtenido', data: { id } };
  }

  async update(id: number, updateDeviceDto: UpdateDeviceDto) {
    // return await this.prisma.device.update({ where: { id }, data: updateDeviceDto });
    return { message: 'Dispositivo actualizado', data: updateDeviceDto };
  }

  async remove(id: number) {
    // return await this.prisma.device.delete({ where: { id } });
    return { message: 'Dispositivo eliminado' };
  }
}
