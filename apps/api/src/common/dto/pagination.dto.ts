import { IsOptional, IsInt, Min } from 'class-validator';
import { ApiProperty } from '@nestjs/swagger';

export class PaginationDto {
  @ApiProperty({
    description: '页码 (默认: 1)',
    required: false,
    example: 1,
  })
  @IsOptional()
  @IsInt({ message: '页码必须是一个整数' })
  @Min(1, { message: '页码最小值为 1' })
  page?: number = 1;

  @ApiProperty({
    description: '每页数量 (默认: 10)',
    required: false,
    example: 10,
  })
  @IsOptional()
  @IsInt({ message: '每页数量必须是一个整数' })
  @Min(1, { message: '每页数量最小值为 1' })
  limit?: number = 10;
}
