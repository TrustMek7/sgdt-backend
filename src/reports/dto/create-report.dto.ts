import { Type } from 'class-transformer';
import { ArrayMinSize, IsArray, IsDateString, IsIn, IsInt, IsOptional, IsString, MaxLength, ValidateNested } from 'class-validator';

export class CreateReportDto {
  @IsOptional()
  @IsDateString()
  startDate?: string;

  @IsOptional()
  @IsDateString()
  endDate?: string;
}

export class UpdateReportDto {
  @IsOptional()
  @IsDateString()
  startDate?: string;

  @IsOptional()
  @IsDateString()
  endDate?: string;
}

export class ReportBatchFilterDto {
  @IsOptional()
  @IsInt()
  floor?: number;

  @IsOptional()
  @IsString()
  areaId?: string;

  @IsOptional()
  @IsIn(['Todos', 'New', 'Transfer'])
  status?: 'Todos' | 'New' | 'Transfer';

  @IsOptional()
  @IsString()
  @MaxLength(120)
  title?: string;
}

export class CreateReportBatchDto {
  @IsArray()
  @ArrayMinSize(1)
  @ValidateNested({ each: true })
  @Type(() => ReportBatchFilterDto)
  reports: ReportBatchFilterDto[];
}
