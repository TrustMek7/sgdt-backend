import { IsString, IsOptional, IsNumber, IsBoolean } from 'class-validator';

export class CreateDeviceDto {
  @IsString()
  name: string;

  @IsString()
  @IsOptional()
  description?: string;

  @IsNumber()
  @IsOptional()
  deviceTypeId?: number;

  @IsNumber()
  @IsOptional()
  areaId?: number;

  @IsBoolean()
  @IsOptional()
  active?: boolean = true;
  }

  export class UpdateDeviceDto {
    @IsString()
    @IsOptional()
    name?: string;

    @IsString()
    @IsOptional()
    description?: string;

    @IsNumber()
    @IsOptional()
    deviceTypeId?: number;

    @IsNumber()
    @IsOptional()
    areaId?: number;

    @IsBoolean()
    @IsOptional()
    active?: boolean;
  }
