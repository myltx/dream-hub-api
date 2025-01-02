import {
  Controller,
  Get,
  Post,
  Body,
  Patch,
  Param,
  Delete,
  Req,
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
@Controller('users')
export class UserController {
  constructor(private readonly userService: UserService) {}

  @ApiBearerAuth() // 鉴权
  @ApiOperation({
    summary: '添加用户', // 接口描述信息
  })
  @ApiOkResponse({
    description: '返回示例',
    type: CreateUserVo,
  })
  @ApiHeader({
    name: 'Authorization',
    description: '用户令牌',
    example: 'Bearer token',
  })
  @Post()
  async create(@Body() createUserDto: CreateUserDto) {
    console.log(createUserDto, 'createUserDto');
    return {
      message: 'success',
      code: 200,
    };
    // return this.userService.create(createUserDto);
  }

  @ApiOperation({
    summary: '查询用户', // 接口描述信息
  })
  @Get()
  async findAll(@Req() req: any) {
    const data = await this.userService.findAll();
    return { data, message: 'success', code: 200 };
  }

  @ApiOperation({
    summary: '查询用户详情', // 接口描述信息
  })
  @Get(':userId')
  async findOne(@Param('userId') userId: string) {
    return this.userService.findOne(userId);
  }
  @ApiOperation({
    summary: '更新用户', // 接口描述信息
  })
  @Patch(':id')
  async update(@Param('id') id: string, @Body() updateUserDto: UpdateUserDto) {
    return this.userService.update(id, updateUserDto);
  }
  @ApiOperation({
    summary: '删除用户', // 接口描述信息
  })
  @Delete(':id')
  async remove(@Param('id') id: string) {
    return this.userService.remove(id);
  }
}
