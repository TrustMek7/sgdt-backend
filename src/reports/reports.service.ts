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
    return { message: 'Reportes obtenidos', data: [] };
  }

  async summary() {
    const [areas, offices, devices, deviceTypes] = await Promise.all([
      this.prisma.area.findMany({ include: { oficinas: true } }),
      this.prisma.oficina.findMany(),
      this.prisma.dispositivo.findMany({ include: { tipo: true, destino: true } }),
      this.prisma.tipoDispositivo.findMany(),
    ]);

    const newDevices = devices.filter((device) => device.estado === 'nuevo').length;
    const transferDevices = devices.filter((device) => device.estado === 'traslado').length;

    return {
      areas: areas.map((area) => ({
        id: area.id.toString(),
        name: area.nombre,
        officeCount: area.oficinas.length,
      })),
      offices: offices.map((office) => ({
        id: office.id.toString(),
        name: office.nombre,
        floor: office.piso,
        areaId: office.areaId.toString(),
      })),
      deviceTypes: deviceTypes.map((type) => ({
        id: type.codigo,
        planCode: type.codigo,
        description: type.descripcion,
        characteristics: type.caracteristicas || '',
        brandModel: type.marcaModelo || '',
        imageUrl: type.imagenUrl || undefined,
      })),
      devices: devices.map((device) => ({
        id: device.id.toString(),
        inventoryCode: device.codigoInventario || '',
        planCode: device.tipoCodigo,
        typeId: device.tipoCodigo,
        status: device.estado === 'nuevo' ? 'New' : 'Transfer',
        floor: device.destino?.piso || 0,
        destinationOfficeId: device.destinoId.toString(),
        originOfficeId: device.origenId ? device.origenId.toString() : undefined,
      })),
      totals: {
        areas: areas.length,
        offices: offices.length,
        deviceTypes: deviceTypes.length,
        devices: devices.length,
        newDevices,
        transferDevices,
      },
    };
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
