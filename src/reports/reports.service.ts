import { Injectable } from '@nestjs/common';
import { PrismaService } from '@/prisma/prisma.service';
import { CreateReportBatchDto, CreateReportDto, ReportBatchFilterDto, UpdateReportDto } from './dto/create-report.dto';

@Injectable()
export class ReportsService {
  constructor(private prisma: PrismaService) {}

  private async loadSources() {
    const [areas, offices, devices, deviceTypes, bajas] = await Promise.all([
      this.prisma.area.findMany({ include: { oficinas: true } }),
      this.prisma.oficina.findMany(),
      this.prisma.dispositivo.findMany({ include: { tipo: true, destino: true, origen: true } }),
      this.prisma.tipoDispositivo.findMany(),
      this.prisma.baja.findMany({ include: { area: true } }),
    ]);

    return { areas, offices, devices, deviceTypes, bajas };
  }

  private buildAreaReports(sources: Awaited<ReturnType<ReportsService['loadSources']>>, areaId?: string) {
    const areas = areaId ? sources.areas.filter((area) => area.id.toString() === areaId) : sources.areas;

    return areas
      .map((area) => {
        const areaOfficeIds = sources.offices.filter((office) => office.areaId === area.id).map((office) => office.id);
        const areaDevices = sources.devices.filter((device) => areaOfficeIds.includes(device.destinoId));
        const areaBajas = sources.bajas.filter((baja) => baja.areaId === area.id);

        const mapDevice = (device: (typeof sources.devices)[number]) => ({
          id: device.id.toString(),
          inventoryCode: device.codigoInventario || '',
          planCode: device.tipoCodigo,
          description: device.tipo.descripcion,
          origin: device.origenDescripcion || device.origen?.nombre || '-',
        });

        const newDevices = areaDevices.filter((device) => device.estado === 'nuevo').map(mapDevice);
        const transferDevices = areaDevices.filter((device) => device.estado === 'traslado').map(mapDevice);
        const bajas = areaBajas.map((baja) => ({
          id: baja.id.toString(),
          inventoryCode: baja.codigoInventario || '',
          description: baja.descripcion,
          officeName: baja.oficinaNombre || '-',
          origin: baja.origen || '-',
          reason: baja.motivo || '-',
        }));

        if (newDevices.length === 0 && transferDevices.length === 0 && bajas.length === 0) {
          return null;
        }

        return {
          area: {
            id: area.id.toString(),
            name: area.nombre,
          },
          newDevices,
          transferDevices,
          bajas,
          totals: {
            newDevices: newDevices.length,
            transferDevices: transferDevices.length,
            bajas: bajas.length,
          },
        };
      })
      .filter(Boolean);
  }

  private buildSummary(sources: Awaited<ReturnType<ReportsService['loadSources']>>, filter?: ReportBatchFilterDto) {
    const filteredOffices = sources.offices.filter((office) => {
      const matchesFloor = filter?.floor ? office.piso === filter.floor : true;
      const matchesArea = filter?.areaId ? office.areaId.toString() === filter.areaId : true;
      return matchesFloor && matchesArea;
    });

    const filteredAreaIds = new Set(filteredOffices.map((office) => office.areaId.toString()));
    const filteredAreas = sources.areas.filter((area) => {
      const matchesArea = filter?.areaId ? area.id.toString() === filter.areaId : true;
      const matchesFloor = filter?.floor
        ? filteredAreaIds.has(area.id.toString())
        : true;
      return matchesArea && matchesFloor;
    });

    const filteredDevices = sources.devices.filter((device) => {
      const matchesOffice = filteredOffices.some((office) => office.id.toString() === device.destinoId.toString());
      const matchesStatus = filter?.status && filter.status !== 'Todos' ? (device.estado === 'nuevo' ? 'New' : 'Transfer') === filter.status : true;
      return matchesOffice && matchesStatus;
    });

    const deviceTypes = sources.deviceTypes.filter((type) =>
      filteredDevices.some((device) => device.tipoCodigo === type.codigo),
    );

    const areas = filteredAreas.map((area) => ({
      id: area.id.toString(),
      name: area.nombre,
      officeCount: filteredOffices.filter((office) => office.areaId === area.id).length,
    }));

    const offices = filteredOffices.map((office) => ({
      id: office.id.toString(),
      name: office.nombre,
      floor: office.piso,
      areaId: office.areaId.toString(),
    }));

    const mappedDeviceTypes = deviceTypes.map((type) => ({
      id: type.codigo,
      planCode: type.codigo,
      description: type.descripcion,
      characteristics: type.caracteristicas || '',
      brandModel: type.marcaModelo || '',
      imageUrl: type.imagenUrl || undefined,
    }));

    const devices = filteredDevices.map((device) => ({
      id: device.id.toString(),
      inventoryCode: device.codigoInventario || '',
      planCode: device.tipoCodigo,
      typeId: device.tipoCodigo,
      status: device.estado === 'nuevo' ? 'New' : 'Transfer',
      floor: device.destino?.piso || 0,
      destinationOfficeId: device.destinoId.toString(),
      originOfficeDescription: device.origenDescripcion || device.origen?.nombre || undefined,
      originOfficeId: device.origenId ? device.origenId.toString() : undefined,
    }));

    const newDevices = devices.filter((device) => device.status === 'New').length;
    const transferDevices = devices.filter((device) => device.status === 'Transfer').length;

    return {
      filter,
      title: this.buildTitle(filter),
      areas,
      offices,
      deviceTypes: mappedDeviceTypes,
      devices,
      totals: {
        areas: areas.length,
        offices: offices.length,
        deviceTypes: mappedDeviceTypes.length,
        devices: devices.length,
        newDevices,
        transferDevices,
      },
    };
  }

  private buildTitle(filter?: ReportBatchFilterDto) {
    const parts: string[] = [];
    if (filter?.floor) parts.push(`Piso ${filter.floor}`);
    if (filter?.areaId) parts.push(`Área ${filter.areaId}`);
    if (filter?.status && filter.status !== 'Todos') parts.push(filter.status === 'New' ? 'Nuevos' : 'Traslados');
    return filter?.title || parts.join(' / ') || 'Reporte general';
  }

  async create(createReportDto: CreateReportDto) {
    // return await this.prisma.report.create({ data: createReportDto });
    return { message: 'Reporte creado', data: createReportDto };
  }

  async findAll() {
    return { message: 'Reportes obtenidos', data: [] };
  }

  async summary() {
    const sources = await this.loadSources();
    return this.buildSummary(sources);
  }

  async batch(createReportBatchDto: CreateReportBatchDto) {
    const sources = await this.loadSources();

    return {
      reports: createReportBatchDto.reports.map((filter) => this.buildSummary(sources, filter)),
    };
  }

  async areaReports(areaId?: string) {
    const sources = await this.loadSources();

    return {
      reports: this.buildAreaReports(sources, areaId),
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
