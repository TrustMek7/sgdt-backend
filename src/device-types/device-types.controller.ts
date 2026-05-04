import { Controller, Get, Post, Body, Patch, Param, Delete, UseGuards } from '@nestjs/common';
import { ApiTags, ApiOperation, ApiBearerAuth } from '@nestjs/swagger';
import { DeviceTypesService } from './device-types.service';
import { CreateDeviceTypeDto, UpdateDeviceTypeDto } from './dto/create-device-type.dto';
import { JwtAuthGuard } from '@/auth/guards/jwt-auth.guard';

@ApiTags('device-types')
@Controller('device-types')
export class DeviceTypesController {
  constructor(private readonly deviceTypesService: DeviceTypesService) {}

  @Post()
  @UseGuards(JwtAuthGuard)
  @ApiBearerAuth()
  @ApiOperation({ summary: 'Crear un nuevo tipo de dispositivo' })
  async create(@Body() createDeviceTypeDto: CreateDeviceTypeDto) {
    return this.deviceTypesService.create(createDeviceTypeDto);
  }

  @Get()
  @ApiOperation({ summary: 'Obtener todos los tipos de dispositivos' })
  async findAll() {
    return this.deviceTypesService.findAll();
  }

  @Get(':id')
  @ApiOperation({ summary: 'Obtener un tipo de dispositivo por ID' })
  async findOne(@Param('id') id: string) {
    return this.deviceTypesService.findOne(id);
  }

  @Patch(':id')
  @UseGuards(JwtAuthGuard)
  @ApiBearerAuth()
  @ApiOperation({ summary: 'Actualizar un tipo de dispositivo' })
  async update(@Param('id') id: string, @Body() updateDeviceTypeDto: UpdateDeviceTypeDto) {
    return this.deviceTypesService.update(id, updateDeviceTypeDto);
  }

  @Delete(':id')
  @UseGuards(JwtAuthGuard)
  @ApiBearerAuth()
  @ApiOperation({ summary: 'Eliminar un tipo de dispositivo' })
  async remove(@Param('id') id: string) {
    return this.deviceTypesService.remove(id);
  }
}
