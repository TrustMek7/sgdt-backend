import { Injectable, NotFoundException } from '@nestjs/common';
import { PrismaService } from '@/prisma/prisma.service';
import { CreateDeviceTypeDto, UpdateDeviceTypeDto } from './dto/create-device-type.dto';

@Injectable()
export class DeviceTypesService {
  constructor(private prisma: PrismaService) {}

  async create(createDeviceTypeDto: CreateDeviceTypeDto) {
    const created = await this.prisma.tipoDispositivo.create({
      data: {
        codigo: createDeviceTypeDto.planCode,
        descripcion: createDeviceTypeDto.description,
        caracteristicas: createDeviceTypeDto.characteristics,
        marcaModelo: createDeviceTypeDto.brandModel,
        imagenUrl: createDeviceTypeDto.imageUrl,
        esTraslado: createDeviceTypeDto.isTransfer ?? createDeviceTypeDto.planCode.startsWith('Ex'),
      },
    });

    return this.mapDeviceType(created);
  }

  async findAll() {
    const types = await this.prisma.tipoDispositivo.findMany({
      orderBy: { codigo: 'asc' },
    });

    return types.map((type) => this.mapDeviceType(type));
  }

  async findOne(id: string) {
    const type = await this.prisma.tipoDispositivo.findUnique({
      where: { codigo: id },
    });

    if (!type) {
      throw new NotFoundException('Tipo de dispositivo no encontrado');
    }

    return this.mapDeviceType(type);
  }

  async update(id: string, updateDeviceTypeDto: UpdateDeviceTypeDto) {
    const updated = await this.prisma.tipoDispositivo.update({
      where: { codigo: id },
      data: {
        codigo: updateDeviceTypeDto.planCode,
        descripcion: updateDeviceTypeDto.description,
        caracteristicas: updateDeviceTypeDto.characteristics,
        marcaModelo: updateDeviceTypeDto.brandModel,
        imagenUrl: updateDeviceTypeDto.imageUrl,
        esTraslado: updateDeviceTypeDto.isTransfer,
      },
    });

    return this.mapDeviceType(updated);
  }

  async remove(id: string) {
    await this.prisma.tipoDispositivo.delete({
      where: { codigo: id },
    });

    return { message: 'Tipo de dispositivo eliminado' };
  }

  private mapDeviceType(type: {
    codigo: string;
    descripcion: string;
    caracteristicas: string | null;
    marcaModelo: string | null;
    imagenUrl: string | null;
    esTraslado: boolean;
  }) {
    return {
      id: type.codigo,
      planCode: type.codigo,
      description: type.descripcion,
      characteristics: type.caracteristicas || '',
      brandModel: type.marcaModelo || '',
      imageUrl: type.imagenUrl || undefined,
      isTransfer: type.esTraslado,
    };
  }
}
