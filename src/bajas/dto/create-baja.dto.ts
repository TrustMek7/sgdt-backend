import { IsOptional, IsString, MaxLength } from 'class-validator';

export class CreateBajaDto {
  @IsString()
  areaId: string;

  @IsString()
  @IsOptional()
  @MaxLength(100)
  codigoInventario?: string;

  @IsString()
  @MaxLength(500)
  descripcion: string;

  @IsString()
  @IsOptional()
  @MaxLength(200)
  oficinaNombre?: string;

  @IsString()
  @IsOptional()
  @MaxLength(200)
  origen?: string;

  @IsString()
  @IsOptional()
  motivo?: string;
}

export class UpdateBajaDto {
  @IsString()
  @IsOptional()
  areaId?: string;

  @IsString()
  @IsOptional()
  @MaxLength(100)
  codigoInventario?: string;

  @IsString()
  @IsOptional()
  @MaxLength(500)
  descripcion?: string;

  @IsString()
  @IsOptional()
  @MaxLength(200)
  oficinaNombre?: string;

  @IsString()
  @IsOptional()
  @MaxLength(200)
  origen?: string;

  @IsString()
  @IsOptional()
  motivo?: string;
}