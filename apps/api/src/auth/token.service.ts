import { Injectable } from '@nestjs/common';
import { createRemoteJWKSet, jwtVerify, JWTPayload } from 'jose';

@Injectable()
export class TokenService {
  private jwks: any;

  constructor() {
    // 初始化 JWKS (JSON Web Key Set)
    this.jwks = createRemoteJWKSet(
      new URL(process.env.LOGTO_ENDPOINT + '/oidc/jwks'),
    );
  }

  /**
   * 验证 Token
   * @param token - 需要验证的 Token
   * @returns 解码后的 Token Payload
   * @throws Error - 如果验证失败或者 Token 失效
   */
  async verifyToken(token: string): Promise<JWTPayload> {
    try {
      // 验证 Token
      const { payload } = await jwtVerify(token, this.jwks, {
        issuer: new URL(process.env.LOGTO_ENDPOINT + 'oidc').href,
        audience: process.env.LOGTO_APP_ID,
      });
      // 验证通过，返回解码的 Payload
      return payload;
    } catch (error) {
      console.error('Token verification failed:', error);
      throw new Error('Invalid or expired token');
    }
  }

  /**
   * 检查 Token 是否过期
   * @param payload - 解码后的 Token Payload
   * @returns boolean - 是否过期
   */
  isTokenExpired(payload: JWTPayload): boolean {
    const currentTime = Math.floor(Date.now() / 1000); // 当前时间 (秒)
    return payload.exp ? payload.exp < currentTime : true; // 如果没有 exp 字段，认为已经过期
  }

  /**
   * 提取用户信息
   * @param payload - 解码后的 Token Payload
   * @returns 用户信息对象
   */
  extractUserInfo(payload: JWTPayload): Record<string, any> {
    return {
      userId: payload.sub, // 用户 ID
      email: payload.email, // 邮箱 (如果 Token 包含该信息)
      roles: payload.roles, // 用户角色 (如果有定义)
      ...payload, // 其他可用字段
    };
  }
}
