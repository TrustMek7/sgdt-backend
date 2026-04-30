import { Injectable } from '@nestjs/common';
import { PrismaService } from '@/prisma/prisma.service';
import { CreateAreaDto, UpdateAreaDto } from './dto/create-area.dto';

@Injectable()
export class AreasService {
  constructor(private prisma: PrismaService) {}

  async create(createAreaDto: CreateAreaDto) {
    // return await this.prisma.area.create({ data: createAreaDto });
    return { message: 'Área creada', data: createAreaDto };
  }

  async findAll() {
    // return await this.prisma.area.findMany();
    return { message: 'Áreas obtenidas', data: [] };
  }

  async findOne(id: number) {
    // return await this.prisma.area.findUnique({ where: { id } });
    return { message: 'Área obtenida', data: { id } };
  }

  async update(id: number, updateAreaDto: UpdateAreaDto) {
    // return await this.prisma.area.update({ where: { id }, data: updateAreaDto });
    return { message: 'Área actualizada', data: updateAreaDto };
  }

  async remove(id: number) {
    // return await this.prisma.area.delete({ where: { id } });
    return { message: 'Área eliminada' };
  }
}
