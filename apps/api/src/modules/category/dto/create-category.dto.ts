import { ApiProperty } from '@nestjs/swagger';
export class CreateCategoryDto {
  @ApiProperty({
    example: '前端',
    description: '分类名称',
  })
  readonly name: string;
  @ApiProperty({
    example: 'xxxx',
    description: '分类描述',
  })
  readonly description: string;
  @ApiProperty({
    example: 'xxxx',
    description: '用户ID',
  })
  readonly userId: string;
}
