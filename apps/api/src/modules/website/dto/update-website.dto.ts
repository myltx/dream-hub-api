import { ApiProperty } from '@nestjs/swagger';
export class UpdateWebsiteDto {
  @ApiProperty({
    example: '123',
    description: '用户ID',
  })
  readonly userId: string;

  @ApiProperty({
    example: 'https://www.baidu.com',
    description: '网站地址',
  })
  readonly url: string;

  @ApiProperty({
    example: '百度',
    description: '网站名称',
  })
  readonly title: string;

  @ApiProperty({
    example: '描述',
    description: '网站描述',
  })
  readonly description?: string;

  @ApiProperty({
    example: 'https://www.baidu.com/favicon.ico',
    description: '网站图片',
  })
  readonly image?: string;

  @ApiProperty({
    example: 'https://www.baidu.com/favicon.ico',
    description: '网站图标',
  })
  readonly logo?: string;

  @ApiProperty({
    example: '1',
    description: '网站分类ID',
  })
  readonly category_id: string;

  @ApiProperty({
    example: '1',
    description: '网站评分（1-5分)',
  })
  readonly rating?: number;
  @ApiProperty({
    example: true,
    description: '网站状态（true-正常，false-禁用)',
  })
  readonly status?: number;
  @ApiProperty({
    example: '1',
    description: '网站排序',
  })
  readonly sort_order?: number;
  @ApiProperty({
    example: 1,
    description: '网站点击量',
  })
  readonly visit_count?: number;
  @ApiProperty({
    example: true,
    description: '是否公开',
  })
  readonly isPublic?: Date;

  @ApiProperty({
    example: true,
    description: '是否推荐',
  })
  readonly isRecommended?: boolean;

  @ApiProperty({
    example: true,
    description: '是否置顶',
  })
  readonly isTop?: boolean;
  @ApiProperty({
    example: '评价',
    description: '用户对该网站的评价',
  })
  readonly review?: boolean;
}
