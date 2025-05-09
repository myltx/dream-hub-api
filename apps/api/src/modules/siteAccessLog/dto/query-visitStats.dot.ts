import { IsOptional, IsString, IsInt, Min, IsNumber } from 'class-validator';
import { ApiProperty } from '@nestjs/swagger';

export class QueryVisitStatsDto {
  @ApiProperty({ description: '开始时间', required: false })
  @IsOptional()
  @IsString()
  start?: string; // 开始时间

  @ApiProperty({ description: '结束时间', required: false })
  @IsOptional()
  @IsString()
  end?: string; // 结束时间
}
