import { IsBoolean, IsOptional, IsString, MaxLength } from 'class-validator';

export class CreateDeviceTypeDto {
  @IsString()
  @MaxLength(10)
  planCode: string;

  @IsString()
  @MaxLength(200)
  description: string;

  @IsString()
  @IsOptional()
  characteristics?: string;

  @IsString()
  @IsOptional()
  brandModel?: string;

  @IsString()
  @IsOptional()
  imageUrl?: string;

  @IsBoolean()
  @IsOptional()
  isTransfer?: boolean;
}

export class UpdateDeviceTypeDto {
  @IsString()
  @IsOptional()
  @MaxLength(10)
  planCode?: string;

  @IsString()
  @IsOptional()
  @MaxLength(200)
  description?: string;

  @IsString()
  @IsOptional()
  characteristics?: string;

  @IsString()
  @IsOptional()
  brandModel?: string;

  @IsString()
  @IsOptional()
  imageUrl?: string;

  @IsBoolean()
  @IsOptional()
  isTransfer?: boolean;
}
