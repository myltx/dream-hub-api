import {
  Controller,
  Get,
  Post,
  Body,
  Patch,
  Param,
  Delete,
  Req,
  HttpCode,
  HttpStatus,
} from '@nestjs/common';
import {
  ApiBearerAuth,
  ApiHeader,
  ApiOkResponse,
  ApiOperation,
  ApiTags,
} from '@nestjs/swagger';
import { UserService } from './user.service';
import { CreateUserDto } from './dto/create-user.dto';
import { UpdateUserDto } from './dto/update-user.dto';
import { CreateUserVo } from './vo/create-user.vo';

@ApiTags('用户管理')
@ApiHeader({
  name: 'Authorization',
  description: '用户令牌',
  example: 'Bearer token',
})
@ApiBearerAuth() // 鉴权
@Controller('user')
export class UserController {
  constructor(private readonly userService: UserService) {}

  @ApiOperation({
    summary: '添加用户', // 接口描述信息
  })
  @ApiOkResponse({
    description: '返回示例',
    type: CreateUserVo,
  })
  @HttpCode(HttpStatus.OK)
  @Post('create')
  async create(@Body() createUserDto: CreateUserDto) {
    return this.userService.create(createUserDto);
  }

  @ApiOperation({
    summary: '查询用户', // 接口描述信息
  })
  @HttpCode(HttpStatus.OK)
  @Get()
  async findAll() {
    return this.userService.findAll();
  }

  @ApiOperation({
    summary: '根据用户id查询用户信息', // 接口描述信息
  })
  @HttpCode(HttpStatus.OK)
  @Post('detail')
  async findOne(@Body() { user_id }) {
    if (!user_id) {
      return {
        message: 'userId不能为空',
        code: 400,
      };
    }
    return this.userService.findOne(user_id);
  }
  @ApiOperation({
    summary: '更新用户', // 接口描述信息
  })
  @HttpCode(HttpStatus.OK)
  @Patch(':id')
  async update(@Param('id') id: string, @Body() updateUserDto: UpdateUserDto) {
    return this.userService.update(id, updateUserDto);
  }
  @ApiOperation({
    summary: '删除用户', // 接口描述信息
  })
  @HttpCode(HttpStatus.OK)
  @Delete(':id')
  async remove(@Param('id') id: string) {
    return this.userService.remove(id);
  }
}
