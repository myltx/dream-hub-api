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
  Headers,
  UseGuards,
  Query,
  BadRequestException,
} from '@nestjs/common';
import {
  ApiBearerAuth,
  ApiExcludeEndpoint,
  ApiHeader,
  ApiOkResponse,
  ApiOperation,
  ApiTags,
} from '@nestjs/swagger';
import { HttpService } from '@nestjs/axios';
import { UserService } from './user.service';
import { CreateUserDto } from './dto/create-user.dto';
import { UpdateUserDto } from './dto/update-user.dto';
import { CreateUserVo } from './vo/create-user.vo';
import { IsPublic } from '../auth/decorators/is-public.decorator';
import { CurrentUser } from '../auth/decorators/user.decorator';
import { ADMIN_ROLE_NAME } from '../../common/utils/index';
import { FindUserDto } from './dto/find-user.dto';

@ApiTags('用户管理')
@ApiHeader({
  name: 'Authorization',
  description: '用户令牌',
  example: 'Bearer token',
})
@ApiBearerAuth() // 鉴权
@Controller('user')
export class UserController {
  constructor(
    private readonly userService: UserService,
    private readonly httpService: HttpService,
  ) {}

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
  async findOne(@Body() dto: FindUserDto) {
    return this.userService.findOne(dto.user_id);
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

  @ApiOperation({
    summary: '获取token', // 接口描述信息
  })
  @HttpCode(HttpStatus.OK)
  @Get('token')
  // @IsPublic()
  // @ApiExcludeEndpoint() // 这个接口不会出现在 Swagger 中
  async getToken() {
    return this.userService.getToken();
  }

  @ApiOperation({
    summary: '判断用户是否为管理员',
  })
  @HttpCode(HttpStatus.OK)
  @Get('checkAdmin')
  // 1.	GET /api/users/me/is-admin
  // 表示判断当前登录用户是否为管理员。
  //   2.	GET /api/auth/is-admin
  // 更偏向于登录权限判断，适合鉴权相关模块。
  //   3.	GET /api/users/:id/is-admin
  // 如果你希望判断任意用户（而非当前用户），可带参数。
  //   4.	POST /api/users/check-admin
  // 如果你需要传入用户信息判断（非基于 token 的），可以用 POST。
  async checkAdmin(@CurrentUser() user: any) {
    const { roles } = user;
    return roles.includes(ADMIN_ROLE_NAME);
  }

  @ApiOperation({
    summary: '获取用户Token',
  })
  @HttpCode(HttpStatus.OK)
  @Get('getUserToken')
  @IsPublic()
  // @ApiExcludeEndpoint() // 这个接口不会出现在 Swagger 中
  async getUserToken(@Query('userId') user_id: string) {
    return this.userService.getUserToken(user_id);
  }
}
