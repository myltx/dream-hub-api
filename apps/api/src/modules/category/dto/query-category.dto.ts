import { IsOptional, IsString, IsInt, Min } from 'class-validator';
import { ApiProperty } from '@nestjs/swagger';

export class QueryCategoryDto {
  @ApiProperty({ description: '分类名称', required: false })
  @IsOptional()
  @IsString()
  name?: string;

  @ApiProperty({ description: '描述信息', required: false })
  @IsOptional()
  @IsString()
  description?: string;

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
