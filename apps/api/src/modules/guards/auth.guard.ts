import {
  CanActivate,
  ExecutionContext,
  Injectable,
  SetMetadata,
  UnauthorizedException,
} from '@nestjs/common';
import { Reflector } from '@nestjs/core';
import { Request } from 'express';
import { createRemoteJWKSet, jwtVerify } from 'jose';
import { LogtoService } from '../logto/logto.service';

export const UncheckAuth = () => SetMetadata('uncheck', true);
export const Permissions = (...permissions: string[]) =>
  SetMetadata('permissions', permissions);

@Injectable()
export class AuthGuard implements CanActivate {
  private jwks: any;
  private logtoService = new LogtoService();
  constructor(private readonly reflector: Reflector) {
    this.jwks = createRemoteJWKSet(
      new URL('/oidc/jwks', process.env.LOGTO_ENDPOINT),
    );
  }

  async canActivate(context: ExecutionContext): Promise<boolean> {
    // 检查当前路由是否有 @IsPublic 装饰器
    const isPublic = this.reflector.get<boolean>(
      'isPublic',
      context.getHandler(),
    );
    if (isPublic) return true;

    const request = context.switchToHttp().getRequest();
    const token = this.extractTokenFromHeader(request);
    const uncheck = Reflect.getMetadata('uncheck', context.getHandler());
    const permissions = Reflect.getMetadata(
      'permissions',
      context.getHandler(),
    );
    if (!token && uncheck) {
      request['userId'] = null;
    } else if (!token) {
      throw new UnauthorizedException();
    }
    try {
      const payload = await this.jwtVerify(token);

      const scopes =
        typeof payload.scope === 'string' ? payload.scope.split(' ') : [];

      if (permissions) {
        if (!permissions.every((scope) => scopes.includes(scope))) {
          throw new UnauthorizedException();
        }
      }
      // console.log(payload, 'payload');
      // 这里获取用户在 Logto 的角色
      const data = await this.logtoService.getUserRoles(payload.sub);
      request['userId'] = payload.sub;
      request['user'] = {
        ...payload,
        roles: data.map((item) => item.name),
      };
    } catch (e) {
      console.log(e, 'e');
      if (!uncheck) {
        throw new UnauthorizedException();
      }
    }
    return true;
  }

  private async jwtVerify(token) {
    // console.log(token, 'token');
    // console.log('------>');
    // console.log(this.jwks, 'jwks');
    // console.log('------>');
    // console.log(new URL('oidc', process.env.LOGTO_ENDPOINT).href, 'issuer');
    // console.log('------>');
    // console.log(process.env.BACKEND_ENDPOINT, 'audience');
    // console.log('------>');
    const { payload } = await jwtVerify(
      // The raw Bearer Token extracted from the request header
      token,
      this.jwks,
      {
        // Expected issuer of the token, issued by the Logto server
        issuer: new URL('oidc', process.env.LOGTO_ENDPOINT).href,
        // Expected audience token, the resource indicator of the current API
        audience: process.env.BACKEND_ENDPOINT,
      },
    );

    return payload;
  }

  private extractTokenFromHeader(request: Request): string | undefined {
    const [type, token] = request.headers.authorization?.split(' ') ?? [];
    return type === 'Bearer' ? token : undefined;
  }
}
