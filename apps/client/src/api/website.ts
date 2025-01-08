import { ServicePrefixEnum } from '~/enums/commonEnum';
import { getHttp } from './http';
import { RequestEnum } from '~/enums/httpEnum';

export function createWebsite(data: any) {
  const http = getHttp();
  return http(`${ServicePrefixEnum.WEBSITE}/create`, {
    method: RequestEnum.POST,
    body: data,
  });
}

export function getWebsite() {
  const http = getHttp();
  return http(`${ServicePrefixEnum.WEBSITE}`, {
    method: RequestEnum.GET,
  });
}

export function getWebsiteList(data: any) {
  const http = getHttp();
  return http(`${ServicePrefixEnum.WEBSITE}/public`, {
    method: RequestEnum.GET,
  });
}

export function getWebsiteQuery(params: any) {
  const http = getHttp();
  // 构建查询字符串
  const queryString = new URLSearchParams(params).toString();

  return http(`${ServicePrefixEnum.WEBSITE}/query?${queryString}`, {
    method: RequestEnum.GET,
  });
}
