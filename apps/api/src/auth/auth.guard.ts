import {
  Injectable,
  CanActivate,
  ExecutionContext,
  HttpException,
  HttpStatus,
} from '@nestjs/common';
import { Reflector } from '@nestjs/core';
import { TokenService } from './token.service';

@Injectable()
export class AuthGuard implements CanActivate {
  constructor(
    private reflector: Reflector,
    private tokenService: TokenService,
  ) {}

  async canActivate(context: ExecutionContext): Promise<boolean> {
    const request = context.switchToHttp().getRequest();
    const response = context.switchToHttp().getResponse();

    // 检查当前路由是否有 @IsPublic 装饰器
    const isPublic = this.reflector.get<boolean>(
      'isPublic',
      context.getHandler(),
    );

    if (isPublic) {
      return true; // 如果路由是公开的，直接通过守卫
    }

    // 检查 Authorization 头
    const authorization = request.headers['authorization'];
    if (!authorization || authorization.length < 7) {
      throw new HttpException(
        'Authorization header is missing',
        HttpStatus.UNAUTHORIZED,
      );
    }

    const token = authorization.replace('Bearer ', '');

    try {
      // 验证 Token
      const { payload } = await this.tokenService.verifyToken(token);

      // 检查 Token 是否过期
      // if (this.tokenService.isTokenExpired(payload)) {
      //   throw new HttpException('Token is expired', HttpStatus.UNAUTHORIZED);
      // }

      // 将用户信息附加到请求对象中
      request.user = payload;
      return true;
    } catch (error) {
      throw new HttpException(error.message, HttpStatus.UNAUTHORIZED);
    }
  }
}
