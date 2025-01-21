import { ApiProperty } from '@nestjs/swagger';
import { IsNotEmpty, IsString } from 'class-validator';

export class UploadFileDto {
  @ApiProperty({ example: 'image' })
  @IsNotEmpty()
  @IsString()
  type: 'image' | 'video' | 'markdown';
  // type: string;
}
