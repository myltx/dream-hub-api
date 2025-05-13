import { ApiProperty } from '@nestjs/swagger';
import { IsIn, IsString } from 'class-validator';

export class CreateFavoritesDto {
  // @ApiProperty({ example: '123', description: '用户ID' })
  // @IsString()
  // readonly userId: string;

  @ApiProperty({ example: '132', description: '收藏项目ID' })
  // @IsString()
  readonly content_id: string;

  @ApiProperty({
    example: 'website',
    description: '收藏类型，可选值：website、post、video',
  })
  @IsString()
  @IsIn(['website', 'post', 'video'], {
    message: 'content_type must be one of website, post, or video',
  })
  readonly content_type: 'website' | 'post' | 'video';
}
