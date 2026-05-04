import { Controller, Get, Post, Body, Patch, Param, Delete, UseGuards, Query } from '@nestjs/common';
import { ApiTags, ApiOperation, ApiBearerAuth } from '@nestjs/swagger';
import { ReportsService } from './reports.service';
import { CreateReportBatchDto, CreateReportDto, UpdateReportDto } from './dto/create-report.dto';
import { JwtAuthGuard } from '@/auth/guards/jwt-auth.guard';

@ApiTags('reports')
@Controller('reports')
export class ReportsController {
  constructor(private readonly reportsService: ReportsService) {}

  @Post()
  @UseGuards(JwtAuthGuard)
  @ApiBearerAuth()
  @ApiOperation({ summary: 'Crear un nuevo reporte' })
  async create(@Body() createReportDto: CreateReportDto) {
    return this.reportsService.create(createReportDto);
  }

  @Post('batch')
  @ApiOperation({ summary: 'Generar múltiples reportes filtrados' })
  async batch(@Body() createReportBatchDto: CreateReportBatchDto) {
    return this.reportsService.batch(createReportBatchDto);
  }

  @Get()
  @ApiOperation({ summary: 'Obtener todos los reportes' })
  async findAll() {
    return this.reportsService.findAll();
  }

  @Get('summary')
  @ApiOperation({ summary: 'Obtener resumen para reportes' })
  async summary() {
    return this.reportsService.summary();
  }

  @Get('areas')
  @ApiOperation({ summary: 'Obtener reporte agrupado por área' })
  async areaReports(@Query('areaId') areaId?: string) {
    return this.reportsService.areaReports(areaId);
  }

  @Get(':id')
  @ApiOperation({ summary: 'Obtener un reporte por ID' })
  async findOne(@Param('id') id: string) {
    return this.reportsService.findOne(+id);
  }

  @Patch(':id')
  @UseGuards(JwtAuthGuard)
  @ApiBearerAuth()
  @ApiOperation({ summary: 'Actualizar un reporte' })
  async update(@Param('id') id: string, @Body() updateReportDto: UpdateReportDto) {
    return this.reportsService.update(+id, updateReportDto);
  }

  @Delete(':id')
  @UseGuards(JwtAuthGuard)
  @ApiBearerAuth()
  @ApiOperation({ summary: 'Eliminar un reporte' })
  async remove(@Param('id') id: string) {
    return this.reportsService.remove(+id);
  }
}
