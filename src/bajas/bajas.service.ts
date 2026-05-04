import { BadRequestException, Injectable, NotFoundException } from '@nestjs/common';
import { PrismaService } from '@/prisma/prisma.service';
import { CreateBajaDto, UpdateBajaDto } from './dto/create-baja.dto';

@Injectable()
export class BajasService {
  constructor(private prisma: PrismaService) {}

  private mapBaja(baja: {
    id: number;
    codigoInventario: string | null;
    areaId: number;
    oficinaNombre: string | null;
    descripcion: string;
    origen: string | null;
    motivo: string | null;
    area?: { nombre: string } | null;
  }) {
    return {
      id: baja.id.toString(),
      inventoryCode: baja.codigoInventario || '',
      areaId: baja.areaId.toString(),
      areaName: baja.area?.nombre || '',
      officeName: baja.oficinaNombre || '',
      description: baja.descripcion,
      origin: baja.origen || '',
      reason: baja.motivo || '',
    };
  }

  async create(dto: CreateBajaDto) {
    const areaId = Number(dto.areaId);
    if (Number.isNaN(areaId)) {
      throw new BadRequestException('Área inválida');
    }

    const area = await this.prisma.area.findUnique({ where: { id: areaId } });
    if (!area) {
      throw new BadRequestException('Área no existe');
    }

    const baja = await this.prisma.baja.create({
      data: {
        codigoInventario: dto.codigoInventario?.trim() || null,
        areaId,
        oficinaNombre: dto.oficinaNombre?.trim() || null,
        descripcion: dto.descripcion.trim(),
        origen: dto.origen?.trim() || null,
        motivo: dto.motivo?.trim() || null,
      },
      include: { area: true },
    });

    return this.mapBaja(baja);
  }

  async findAll() {
    const bajas = await this.prisma.baja.findMany({ include: { area: true }, orderBy: { createdAt: 'desc' } });
    return bajas.map((baja) => this.mapBaja(baja));
  }

  async findOne(id: number) {
    const baja = await this.prisma.baja.findUnique({ where: { id }, include: { area: true } });
    if (!baja) {
      throw new NotFoundException('Baja no encontrada');
    }

    return this.mapBaja(baja);
  }

  async update(id: number, dto: UpdateBajaDto) {
    const current = await this.prisma.baja.findUnique({ where: { id } });
    if (!current) {
      throw new NotFoundException('Baja no encontrada');
    }

    const areaId = dto.areaId ? Number(dto.areaId) : current.areaId;
    if (Number.isNaN(areaId)) {
      throw new BadRequestException('Área inválida');
    }

    const updated = await this.prisma.baja.update({
      where: { id },
      data: {
        ...(dto.codigoInventario !== undefined ? { codigoInventario: dto.codigoInventario?.trim() || null } : {}),
        ...(dto.descripcion !== undefined ? { descripcion: dto.descripcion.trim() } : {}),
        ...(dto.oficinaNombre !== undefined ? { oficinaNombre: dto.oficinaNombre?.trim() || null } : {}),
        ...(dto.origen !== undefined ? { origen: dto.origen?.trim() || null } : {}),
        ...(dto.motivo !== undefined ? { motivo: dto.motivo?.trim() || null } : {}),
        areaId,
      },
      include: { area: true },
    });

    return this.mapBaja(updated);
  }

  async remove(id: number) {
    await this.prisma.baja.delete({ where: { id } });
    return { message: 'Baja eliminada' };
  }
}