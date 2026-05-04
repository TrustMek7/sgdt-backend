import { Body, Controller, Delete, Get, Param, Patch, Post } from '@nestjs/common';
import { ApiOperation, ApiTags } from '@nestjs/swagger';
import { BajasService } from './bajas.service';
import { CreateBajaDto, UpdateBajaDto } from './dto/create-baja.dto';

@ApiTags('bajas')
@Controller('bajas')
export class BajasController {
  constructor(private readonly bajasService: BajasService) {}

  @Post()
  @ApiOperation({ summary: 'Crear una baja' })
  create(@Body() dto: CreateBajaDto) {
    return this.bajasService.create(dto);
  }

  @Get()
  @ApiOperation({ summary: 'Listar bajas' })
  findAll() {
    return this.bajasService.findAll();
  }

  @Get(':id')
  @ApiOperation({ summary: 'Obtener una baja por ID' })
  findOne(@Param('id') id: string) {
    return this.bajasService.findOne(+id);
  }

  @Patch(':id')
  @ApiOperation({ summary: 'Actualizar una baja' })
  update(@Param('id') id: string, @Body() dto: UpdateBajaDto) {
    return this.bajasService.update(+id, dto);
  }

  @Delete(':id')
  @ApiOperation({ summary: 'Eliminar una baja' })
  remove(@Param('id') id: string) {
    return this.bajasService.remove(+id);
  }
}