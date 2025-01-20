import { ApiProperty } from '@nestjs/swagger';

export class CreateFileVo {
  @ApiProperty({ example: 200 })
  code: number;
  @ApiProperty({
    example: {
      id: 1,
      path: 'http://localhost:3000/file/1.jpg',
      url: 'http://localhost:3000/file/1.jpg',
    },
  })
  data: {
    id: number;
    path: string;
    url: string;
  };
  @ApiProperty({ example: '请求成功' })
  describe: string;
}
