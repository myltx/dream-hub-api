import {
  Injectable,
  CanActivate,
  ExecutionContext,
  HttpException,
  HttpStatus,
} from '@nestjs/common';
import { Reflector } from '@nestjs/core';
import { TokenService } from '../token.service';

@Injectable()
export class AuthGuard implements CanActivate {
  constructor(
    private reflector: Reflector,
    private tokenService: TokenService,
  ) {}

  async canActivate(context: ExecutionContext): Promise<boolean> {
    const request = context.switchToHttp().getRequest();

    // 检查当前路由是否有 @IsPublic 装饰器
    const isPublic = this.reflector.get<boolean>(
      'isPublic',
      context.getHandler(),
    );

    // 检查 Authorization 头
    const authorization = request.headers['authorization'];
    if (authorization && authorization.startsWith('Bearer ')) {
      const token = authorization.replace('Bearer ', '').trim();

      try {
        // 验证 Token
        const payload = await this.tokenService.verifyToken(token);

        // 将用户信息附加到请求对象中
        request.user = payload;
      } catch (error) {
        if (!isPublic) {
          throw new HttpException(error.message, HttpStatus.UNAUTHORIZED);
        }
        // 如果是公开路由且 Token 验证失败，继续放行
      }
    } else if (!isPublic) {
      throw new HttpException(
        'Authorization header is missing',
        HttpStatus.UNAUTHORIZED,
      );
    }

    // 如果路由是公开的，直接通过守卫
    return true;
  }
}
