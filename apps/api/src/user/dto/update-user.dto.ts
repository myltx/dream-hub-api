import { ApiProperty } from "@nestjs/swagger";

export class UpdateUserDto {
  @ApiProperty({
    example: "123@qq.com",
    description: "邮箱",
  })
  readonly email: string;
  @ApiProperty({
    example: "123@qq.com",
    description: "邮箱",
  })
  readonly user_id: string;
}
