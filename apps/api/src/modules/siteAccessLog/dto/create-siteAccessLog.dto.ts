import { ApiProperty } from '@nestjs/swagger';
export class CreateLogDto {
  @ApiProperty({ example: 123, description: '用户ID' })
  readonly user_id: string;

  @ApiProperty({ example: '2022-01-01 00:00:00', description: '访问时间' })
  readonly accessTime?: Date;

  @ApiProperty({ example: 'http://example.com', description: '访问IP' })
  readonly ipAddress?: string;

  @ApiProperty({
    example: 'Mozilla/5.0',
    description: '访问者的用户代理字符串',
  })
  readonly userAgent?: string;
  @ApiProperty({
    example: 'Chrome',
    description: '访问者的浏览器名称',
  })
  readonly browserName?: string;
  @ApiProperty({
    example: 'Windows',
    description: '访问者的操作系统名称',
  })
  readonly deviceType?: string;
}
