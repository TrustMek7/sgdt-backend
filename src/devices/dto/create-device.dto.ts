import { IsArray, IsInt, IsOptional, IsString, Max, MaxLength, Min } from 'class-validator';

export class CreateDeviceDto {
  @IsString()
  @IsOptional()
  @MaxLength(100)
  inventoryCode?: string;

  @IsArray()
  @IsString({ each: true })
  @IsOptional()
  inventoryCodes?: string[];

  @IsString()
  typeId: string;

  @IsString()
  destinationOfficeId: string;

  @IsString()
  @IsOptional()
  originOfficeDescription?: string;

  @IsInt()
  @IsOptional()
  @Min(1)
  @Max(999)
  quantity?: number;
}

export class UpdateDeviceDto {
  @IsString()
  @IsOptional()
  @MaxLength(100)
  inventoryCode?: string;

  @IsString()
  @IsOptional()
  typeId?: string;

  @IsString()
  @IsOptional()
  destinationOfficeId?: string;

  @IsString()
  @IsOptional()
  originOfficeDescription?: string;
}
