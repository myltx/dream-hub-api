import type { AxiosInstance } from 'axios';

import { Injectable } from '@nestjs/common';
import axios from 'axios';

@Injectable()
export class LogtoService {
  logtoApi: AxiosInstance;
  private encodedCredentials: string;

  constructor() {
    this.encodedCredentials = this.createCredentials();
    this.initLogtoApi();
  }

  private createCredentials() {
    console.log(process.env.LOGTO_CLIENT_ID, process.env.LOGTO_CLIENT_SECRET);
    return Buffer.from(
      `${process.env.LOGTO_CLIENT_ID}:${process.env.LOGTO_CLIENT_SECRET}`,
    ).toString('base64');
  }

  private async initLogtoApi() {
    this.logtoApi = axios.create({
      baseURL: process.env.LOGTO_ENDPOINT,
      timeout: 5000,
    });

    this.logtoApi.interceptors.request.use(async (config) => {
      const token = await this.fetchToken();
      // console.log(token, 'token');
      config.headers.Authorization = `Bearer ${token}`;
      // console.log(config, 'config');
      return config;
    });
  }

  public async fetchToken(options: { resource?: string; scope?: string } = {}) {
    const { resource = process.env.LOGTO_M2M_API, scope = 'all' } = options;

    const { data } = await axios({
      method: 'post',
      baseURL: process.env.LOGTO_ENDPOINT,
      url: 'oidc/token',
      data: {
        grant_type: 'client_credentials',
        resource,
        scope,
      },
      headers: {
        Authorization: `Basic ${this.encodedCredentials}`,
        'Content-Type': 'application/x-www-form-urlencoded',
      },
    });

    return data.access_token;
  }
  public async getUserRoles(userId: string) {
    const { data } = await this.logtoApi.get(`/api/users/${userId}/roles`);
    return data;
  }
  public async getPersonalAccessTokens(userId: string) {
    const { data } = await this.logtoApi.get(
      `/api/users/${userId}/personal-access-tokens`,
    );
    console.log(data, 'data');
    return data;
  }
  public async addPersonalAccessToken(
    userId: string,
    tokenName: string,
    expiresAt: string,
  ) {
    const { data } = await this.logtoApi.post(
      `/api/users/${userId}/personal-access-tokens`,
      {
        name: tokenName,
        // 我需要的是 一个临时的token 过期时间为
        expiresAt: new Date(
          Date.now() + 1000 * 60 * 60 * 24 * 30,
        ).toISOString(), // 30天后过期
        scopes: ['all'],
      },
    );
    return data;
  }
}
