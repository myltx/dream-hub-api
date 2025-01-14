import { ApiProperty } from '@nestjs/swagger';
import { IsNotEmpty, IsString, IsUrl, MaxLength } from 'class-validator';
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
  @IsNotEmpty({ message: '网站地址不能为空' })
  @IsString({ message: '网站地址必须是字符串' })
  @IsUrl({}, { message: '网站地址格式不正确' })
  readonly url: string;

  @ApiProperty({
    example: '百度',
    description: '网站名称',
  })
  @MaxLength(12, { message: '网站名称不能超过12个字符' })
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
  // @IsString({ message: '网站图片地址必须是字符串' })
  // @IsUrl({}, { message: '网站图片地址格式不正确' })
  readonly image?: string;

  @ApiProperty({
    example: 'https://www.baidu.com/favicon.ico',
    description: '网站图标',
  })
  // @IsString({ message: '网站t图标地址必须是字符串' })
  // @IsUrl({}, { message: '网站图标地址格式不正确' })
  readonly logo?: string;

  @ApiProperty({
    example: '1',
    description: '网站分类ID',
  })
  readonly category_id: string;

  @ApiProperty({
    example: [1, 2],
    description: '网站标签ID',
  })
  tags?: string[];

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
  readonly sortOrder?: number;
  @ApiProperty({
    example: 1,
    description: '网站点击量',
  })
  readonly visitCount?: number;
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
