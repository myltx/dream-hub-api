import { ApiProperty } from '@nestjs/swagger';
export class CreateUserDto {
  @ApiProperty({
    example: '123@qq.com',
    description: '邮箱',
  })
  readonly email: string;
  @ApiProperty({
    example: '123',
    description: '用户id',
  })
  readonly userId: string;
}
