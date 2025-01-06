import { ApiProperty } from '@nestjs/swagger';
export class UpdateTagDto {
  @ApiProperty({ example: '前端', description: '标签名称' })
  name: string;
}
