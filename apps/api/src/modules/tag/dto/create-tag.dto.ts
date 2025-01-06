import { ApiProperty } from '@nestjs/swagger';
export class CreateTagDto {
  @ApiProperty({ example: '前端', description: '标签名称' })
  name: string;

  @ApiProperty({ example: 123, description: '用户ID' })
  userId: string;
}
