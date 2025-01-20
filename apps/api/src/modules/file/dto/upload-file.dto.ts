import { IsString } from 'class-validator';

export class UploadFileDto {
  @IsString()
  bucket: string;

  @IsString()
  path: string;
}
