import { ApiProperty } from '@nestjs/swagger';
export class CreateWebsiteAccessLogDto {
  @ApiProperty({ example: 123, description: '用户ID' })
  readonly user_id?: string;

  @ApiProperty({ example: '2022-01-01 00:00:00', description: '访问时间' })
  readonly accessTime?: Date;

  @ApiProperty({
    example: '1',
    description: '站点ID',
  })
  readonly websiteId: string;
}
