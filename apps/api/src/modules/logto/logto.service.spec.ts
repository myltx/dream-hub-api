import { Test, TestingModule } from '@nestjs/testing';
import { LogtoService } from './logto.service';
import axios, { AxiosInstance } from 'axios';

jest.mock('axios');
const mockedAxios = axios as unknown as jest.Mock;

describe('LogtoService', () => {
  let service: LogtoService;

  const mockAxiosInstance = {
    interceptors: {
      request: {
        use: jest.fn(),
      },
    },
    get: jest.fn(),
  } as unknown as AxiosInstance;

  beforeEach(async () => {
    // 模拟环境变量
    process.env.LOGTO_CLIENT_ID = 'test-client-id';
    process.env.LOGTO_CLIENT_SECRET = 'test-client-secret';
    process.env.LOGTO_ENDPOINT = 'http://test-logto-endpoint';
    process.env.LOGTO_M2M_API = 'test-m2m-api';

    // 模拟 axios
    (axios.create as jest.Mock).mockReturnValue(mockAxiosInstance);
    mockedAxios.mockImplementation(() =>
      Promise.resolve({
        data: { access_token: 'test-token' },
      }),
    );

    const module: TestingModule = await Test.createTestingModule({
      providers: [LogtoService],
    }).compile();

    service = module.get<LogtoService>(LogtoService);
  });

  afterEach(() => {
    jest.clearAllMocks();
  });

  it('should be defined', () => {
    expect(service).toBeDefined();
  });

  describe('fetchToken', () => {
    it('should fetch token successfully', async () => {
      const mockToken = 'test-access-token';
      mockedAxios.mockImplementationOnce(() =>
        Promise.resolve({
          data: { access_token: mockToken },
        }),
      );

      const result = await service.fetchToken();

      expect(result).toBe(mockToken);
      expect(mockedAxios).toHaveBeenCalledWith(
        expect.objectContaining({
          method: 'post',
          url: 'oidc/token',
          data: {
            grant_type: 'client_credentials',
            resource: process.env.LOGTO_M2M_API,
            scope: 'all',
          },
        }),
      );
    });

    it('should fetch token with custom options', async () => {
      const mockToken = 'test-access-token';
      const customResource = 'custom-resource';
      const customScope = 'custom-scope';
      mockedAxios.mockImplementationOnce(() =>
        Promise.resolve({
          data: { access_token: mockToken },
        }),
      );

      const result = await service.fetchToken({
        resource: customResource,
        scope: customScope,
      });

      expect(result).toBe(mockToken);
      expect(mockedAxios).toHaveBeenCalledWith(
        expect.objectContaining({
          method: 'post',
          url: 'oidc/token',
          data: {
            grant_type: 'client_credentials',
            resource: customResource,
            scope: customScope,
          },
        }),
      );
    });
  });

  describe('getUserRoles', () => {
    it('should get user roles successfully', async () => {
      const userId = 'test-user-id';
      const mockRoles = { roles: ['admin', 'user'] };
      (mockAxiosInstance.get as jest.Mock).mockResolvedValueOnce({
        data: mockRoles,
      });

      const result = await service.getUserRoles(userId);

      expect(result).toEqual(mockRoles);
      expect(mockAxiosInstance.get).toHaveBeenCalledWith(
        `/api/users/${userId}/roles`,
      );
    });
  });
});
