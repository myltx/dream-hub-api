import { IsOptional, IsString, IsInt, Min, IsNumber } from 'class-validator';
import { ApiProperty } from '@nestjs/swagger';

export class QueryWebsiteDto {
  @ApiProperty({ description: '站点名称', required: false })
  @IsOptional()
  @IsString()
  title?: string;

  @ApiProperty({ description: '站点分类ID', required: false })
  @IsOptional()
  @IsNumber()
  categoryId?: string;

  @ApiProperty({ description: '用户ID', required: false })
  @IsOptional()
  @IsString()
  user_id?: string;

  @ApiProperty({ description: '页码 (默认: 1)', required: false, example: 1 })
  @IsOptional()
  @IsInt()
  @Min(1)
  page?: number = 1;

  @ApiProperty({
    description: '每页数量 (默认: 10)',
    required: false,
    example: 10,
  })
  @IsOptional()
  @IsInt()
  @Min(1)
  limit?: number = 10;
}
