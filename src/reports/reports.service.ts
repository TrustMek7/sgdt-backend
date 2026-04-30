import { Injectable } from '@nestjs/common';
import { PrismaService } from '@/prisma/prisma.service';
import { CreateReportDto, UpdateReportDto } from './dto/create-report.dto';

@Injectable()
export class ReportsService {
  constructor(private prisma: PrismaService) {}

  async create(createReportDto: CreateReportDto) {
    // return await this.prisma.report.create({ data: createReportDto });
    return { message: 'Reporte creado', data: createReportDto };
  }

  async findAll() {
    // return await this.prisma.report.findMany();
    return { message: 'Reportes obtenidos', data: [] };
  }

  async findOne(id: number) {
    // return await this.prisma.report.findUnique({ where: { id } });
    return { message: 'Reporte obtenido', data: { id } };
  }

  async update(id: number, updateReportDto: UpdateReportDto) {
    // return await this.prisma.report.update({ where: { id }, data: updateReportDto });
    return { message: 'Reporte actualizado', data: updateReportDto };
  }

  async remove(id: number) {
    // return await this.prisma.report.delete({ where: { id } });
    return { message: 'Reporte eliminado' };
  }
}
