import { ApiProperty } from '@nestjs/swagger';
import { IsString } from 'class-validator';

export class UpdateUserDto {
  @ApiProperty({
    example: '123@qq.com',
    description: '邮箱',
  })
  readonly email: string;

  @ApiProperty({
    example: 'https://example.com/avatar.jpg',
    description: '头像',
  })
  @IsString()
  readonly avatar: string;

  @ApiProperty({
    example: '张三',
    description: '昵称',
  })
  @IsString()
  readonly nike_name: string;
}
