import {
  Controller,
  Headers,
  Get,
  Post,
  Body,
  Patch,
  Param,
  Delete,
} from '@nestjs/common';
import { UserService } from './user.service';
import { CreateUserDto } from './dto/create-user.dto';
import { UpdateUserDto } from './dto/update-user.dto';
import { createRemoteJWKSet, jwtVerify } from 'jose';

@Controller('users')
export class UserController {
  private jwks: any;
  constructor(private readonly userService: UserService) {
    this.jwks = createRemoteJWKSet(
      new URL('/oidc/jwks', process.env.LOGTO_ENDPOINT),
    );
  }

  @Post()
  async create(@Body() createUserDto: CreateUserDto) {
    return this.userService.create(createUserDto);
  }

  @Get()
  async findAll(@Headers('Authorization') Authorization: string) {
    console.log(Authorization, 'Authorization');
    console.log(this.jwks, 'jwks');
    const { payload } = await jwtVerify(
      // The raw Bearer Token extracted from the request header
      Authorization,
      this.jwks,
      {
        // Expected issuer of the token, issued by the Logto server
        issuer: new URL('oidc', process.env.LOGTO_ENDPOINT).href,
        // Expected audience token, the resource indicator of the current API
        audience: process.env.BACKEND_ENDPOINT,
      },
    );
    console.log(payload, 'payload');
    const data = await this.userService.findAll();
    return {
      data,
      message: 'success',
      code: 200,
    };
  }

  @Get(':userId')
  async findOne(@Param('userId') userId: string) {
    return this.userService.findOne(userId);
  }

  @Patch(':id')
  async update(@Param('id') id: string, @Body() updateUserDto: UpdateUserDto) {
    return this.userService.update(id, updateUserDto);
  }

  @Delete(':id')
  async remove(@Param('id') id: string) {
    return this.userService.remove(id);
  }
}
