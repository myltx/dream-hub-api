import { ApiProperty } from '@nestjs/swagger';
import { IsIn } from 'class-validator';
export class CreateFavoritesDto {
  @ApiProperty({ example: 123, description: '用户ID' })
  readonly user_id: string;

  @ApiProperty({
    example: '132',
    description: '收藏项目ID',
  })
  readonly content_id: string;

  @ApiProperty({
    example: 'website、post、video',
    description: '收藏类型',
  })
  @IsIn(['website', 'post', 'video'], {
    message: 'content_type must be one of website, post, or video',
  })
  readonly content_type: 'website' | 'post' | 'video'; // 站点、帖子、视频
}
