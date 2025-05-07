import { AuthGuard } from './auth.guard';
import { Reflector } from '@nestjs/core';
import {
  UnauthorizedException,
  ForbiddenException,
  ExecutionContext,
} from '@nestjs/common';
import { jwtVerify } from 'jose';

const createMockExecutionContext = (request: any = {}) =>
  ({
    switchToHttp: () => ({
      getRequest: () => request,
    }),
    getHandler: () => ({}),
    getClass: () => ({}),
  }) as ExecutionContext;
import { ConfigService } from '@nestjs/config';

jest.mock('jose', () => ({
  jwtVerify: jest.fn(),
}));

describe('AuthGuard', () => {
  let guard: AuthGuard;
  let reflector: Reflector;
  let configService: ConfigService;

  beforeEach(() => {
    reflector = new Reflector();
    configService = {
      get: jest.fn((key: string) => {
        if (key === 'LOGTO_ENDPOINT') return 'https://test-logto-endpoint.com';
        if (key === 'BACKEND_ENDPOINT')
          return 'https://test-backend-endpoint.com';
        return null;
      }),
    } as any;
    guard = new AuthGuard(reflector);
  });

  it('should be defined', () => {
    expect(guard).toBeDefined();
  });

  it('should allow public routes', async () => {
    jest.spyOn(reflector, 'get').mockReturnValue(true); // isPublic

    const context = createMockExecutionContext();
    const result = await guard.canActivate(context);
    expect(result).toBe(true);
  });

  it('should allow uncheck auth routes without token', async () => {
    jest.spyOn(reflector, 'get').mockReturnValue(false);
    jest
      .spyOn(Reflect, 'getMetadata')
      .mockImplementation((key) => key === 'uncheck');

    const context = createMockExecutionContext({ headers: {} });

    const result = await guard.canActivate(context);
    expect(result).toBe(true);
  });

  it('should throw UnauthorizedException if no token is provided', async () => {
    jest.spyOn(reflector, 'get').mockReturnValue(false);
    jest.spyOn(Reflect, 'getMetadata').mockReturnValue(false);

    const context = createMockExecutionContext({ headers: {} });

    await expect(guard.canActivate(context)).rejects.toThrow(
      UnauthorizedException,
    );
  });

  it('should set user and userId if token is valid', async () => {
    jest.spyOn(reflector, 'get').mockReturnValue(false);
    jest.spyOn(Reflect, 'getMetadata').mockReturnValue(false);

    const mockPayload = {
      sub: 'test-user-id',
      scope: 'read:all',
      roles: ['管理员'],
      iss: 'https://test-logto-endpoint.com/oidc',
      aud: 'https://test-backend-endpoint.com',
    };

    (jwtVerify as jest.Mock).mockResolvedValue({
      payload: mockPayload,
      protectedHeader: { alg: 'RS256', kid: 'test-kid' },
    });

    const request = {
      headers: {
        authorization: 'Bearer test-token',
      },
    };

    const context = createMockExecutionContext(request);

    const result = await guard.canActivate(context);

    expect(result).toBe(true);
    expect(request['user']).toEqual(mockPayload);
    expect(request['userId']).toBe(mockPayload.sub);
  });

  it('should deny access if token does not have required permissions', async () => {
    jest.spyOn(reflector, 'get').mockReturnValue(false);
    jest.spyOn(Reflect, 'getMetadata').mockImplementation((key) => {
      if (key === 'permissions') return ['write:admin'];
      return false;
    });

    const mockPayload = {
      sub: 'test-user-id',
      scope: 'read:only',
      roles: ['普通用户'],
      iss: 'https://test-logto-endpoint.com/oidc',
      aud: 'https://test-backend-endpoint.com',
    };

    (jwtVerify as jest.Mock).mockResolvedValue({
      payload: mockPayload,
      protectedHeader: { alg: 'RS256', kid: 'test-kid' },
    });

    const request = {
      headers: {
        authorization: 'Bearer test-token',
      },
    };

    const context = createMockExecutionContext(request);

    await expect(guard.canActivate(context)).rejects.toThrow(
      ForbiddenException,
    );
  });

  it('should allow if required permission is present in token', async () => {
    jest.spyOn(reflector, 'get').mockReturnValue(false);
    jest.spyOn(Reflect, 'getMetadata').mockImplementation((key) => {
      if (key === 'permissions') return ['required-permission'];
      return false;
    });

    const mockPayload = {
      sub: 'test-user-id',
      scope: 'required-permission read:more',
      roles: ['管理员'],
      iss: 'https://test-logto-endpoint.com/oidc',
      aud: 'https://test-backend-endpoint.com',
    };

    (jwtVerify as jest.Mock).mockResolvedValue({
      payload: mockPayload,
      protectedHeader: { alg: 'RS256', kid: 'test-kid' },
    });

    const request = {
      headers: {
        authorization: 'Bearer test-token',
      },
    };

    const context = createMockExecutionContext(request);

    const result = await guard.canActivate(context);

    expect(result).toBe(true);
    expect(request['userId']).toBe(mockPayload.sub);
  });

  it('should allow uncheck routes even if token is invalid', async () => {
    jest.spyOn(reflector, 'get').mockReturnValue(false);
    jest
      .spyOn(Reflect, 'getMetadata')
      .mockImplementation((key) => key === 'uncheck');

    (jwtVerify as jest.Mock).mockRejectedValue(new Error('Invalid token'));

    const request = {
      headers: {
        authorization: 'Bearer test-token',
      },
    };

    const context = createMockExecutionContext(request);

    const result = await guard.canActivate(context);
    expect(result).toBe(true);
  });

  it('should throw UnauthorizedException if jwt payload is missing', async () => {
    jest.spyOn(reflector, 'get').mockReturnValue(false);
    jest.spyOn(Reflect, 'getMetadata').mockReturnValue(false);

    (jwtVerify as jest.Mock).mockResolvedValue({
      payload: undefined,
      protectedHeader: {},
    });

    const request = {
      headers: {
        authorization: 'Bearer test-token',
      },
    };

    const context = createMockExecutionContext(request);

    await expect(guard.canActivate(context)).rejects.toThrow(
      UnauthorizedException,
    );
  });

  it('should throw UnauthorizedException if token has no sub field', async () => {
    jest.spyOn(reflector, 'get').mockReturnValue(false);
    jest.spyOn(Reflect, 'getMetadata').mockReturnValue(false);

    const mockPayload = {
      scope: 'read:only',
      roles: ['普通用户'],
      iss: 'https://test-logto-endpoint.com/oidc',
      aud: 'https://test-backend-endpoint.com',
    };

    (jwtVerify as jest.Mock).mockResolvedValue({
      payload: mockPayload,
      protectedHeader: { alg: 'RS256', kid: 'test-kid' },
    });

    const request = {
      headers: {
        authorization: 'Bearer test-token',
      },
    };

    const context = createMockExecutionContext(request);

    await expect(guard.canActivate(context)).rejects.toThrow(
      UnauthorizedException,
    );
  });
});
