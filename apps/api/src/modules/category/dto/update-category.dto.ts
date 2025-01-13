import { ApiProperty } from '@nestjs/swagger';
import { IsEmpty, MaxLength } from 'class-validator';
export class UpdateCategoryDto {
  @ApiProperty({
    example: '前端',
    description: '分类名称',
  })
  // @IsEmpty({ message: '分类名称不能为空' })
  @MaxLength(6, {
    message: '分类名称不能超过6个字符',
  })
  readonly name: string;

  @ApiProperty({
    example: 'xxxx',
    description: '分类描述',
  })
  // @MaxLength(100, {
  //   message: '分类描述不能超过100个字符',
  // })
  readonly description?: string;

  @ApiProperty({
    example: 1,
    description: '排序',
  })
  @IsEmpty({ message: '排序不能为空' })
  readonly sortOrder: number;
}
