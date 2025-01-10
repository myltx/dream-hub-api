import { ServicePrefixEnum } from '~/enums/commonEnum';
import { getHttp } from './http';
import { RequestEnum } from '~/enums/httpEnum';

export function createSiteAccessLog(data: any) {
  const http = getHttp();
  return http(`${ServicePrefixEnum.SITEACCESSLOG}`, {
    method: RequestEnum.POST,
    body: data,
  });
}

export function getSiteAccessLog() {
  const http = getHttp();
  return http(`${ServicePrefixEnum.SITEACCESSLOG}`, {
    method: RequestEnum.GET,
  });
}

export function getSiteAccessInterViewCount() {
  const http = getHttp();
  return http(`${ServicePrefixEnum.SITEACCESSLOG}/count`, {
    method: RequestEnum.GET,
  });
}

export function getSiteAccessLogQuery(params: any) {
  const http = getHttp();
  // 构建查询字符串
  const queryString = new URLSearchParams(params).toString();

  return http(`${ServicePrefixEnum.SITEACCESSLOG}/query?${queryString}`, {
    method: RequestEnum.GET,
  });
}
