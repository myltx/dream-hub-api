import { ApiProperty } from '@nestjs/swagger';

export class CreateUserVo {
  @ApiProperty({ example: 200 })
  code: number;
  @ApiProperty({
    example: true,
  })
  data: string;
  @ApiProperty({ example: '请求成功' })
  describe: string;
}
// {
// 	id: 16,
// 	email: '123@qq.com',
// 	user_id: '123',
// 	created_at: '2024-12-20T08:35:04.224395',
// 	updated_at: '2024-12-20T08:35:04.224395',
// 	nikeName: 'myltx',
// 	avatar:
// 	  'https://env-00jxh693vvmh.normal.cloudstatic.cn/AddrVault/logo.gif',
//       },
