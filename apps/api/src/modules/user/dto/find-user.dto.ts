// dto/find-user.dto.ts
import { IsNotEmpty } from 'class-validator';

export class FindUserDto {
  @IsNotEmpty({ message: 'userId不能为空' })
  user_id: string;
}
