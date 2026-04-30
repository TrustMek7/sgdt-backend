import { Injectable } from '@nestjs/common';
import { PrismaService } from '@/prisma/prisma.service';
import { CreateOfficeDto, UpdateOfficeDto } from './dto/create-office.dto';

@Injectable()
export class OfficesService {
  constructor(private prisma: PrismaService) {}

  async create(createOfficeDto: CreateOfficeDto) {
    // return await this.prisma.office.create({ data: createOfficeDto });
    return { message: 'Oficina creada', data: createOfficeDto };
  }

  async findAll() {
    // return await this.prisma.office.findMany();
    return { message: 'Oficinas obtenidas', data: [] };
  }

  async findOne(id: number) {
    // return await this.prisma.office.findUnique({ where: { id } });
    return { message: 'Oficina obtenida', data: { id } };
  }

  async update(id: number, updateOfficeDto: UpdateOfficeDto) {
    // return await this.prisma.office.update({ where: { id }, data: updateOfficeDto });
    return { message: 'Oficina actualizada', data: updateOfficeDto };
  }

  async remove(id: number) {
    // return await this.prisma.office.delete({ where: { id } });
    return { message: 'Oficina eliminada' };
  }
}
