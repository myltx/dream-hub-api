import { ServicePrefixEnum } from '~/enums/commonEnum';
import { getHttp } from './http';
import { RequestEnum } from '~/enums/httpEnum';

export function createCategory(data: any) {
  const http = getHttp();
  return http(`${ServicePrefixEnum.CATEGORY}`, {
    method: RequestEnum.POST,
    body: data,
  });
}

export function updateCategory(id: string, data: any) {
  const http = getHttp();
  return http(`${ServicePrefixEnum.CATEGORY}/${id}`, {
    method: RequestEnum.PATCH,
    body: data,
  });
}

export function getCategory() {
  const http = getHttp();
  return http(`${ServicePrefixEnum.CATEGORY}`, {
    method: RequestEnum.GET,
  });
}

export function getCategoryList() {
  const http = getHttp();
  return http(`${ServicePrefixEnum.CATEGORY}/public`, {
    method: RequestEnum.GET,
  });
}

export function delCategory(id: string) {
  const http = getHttp();
  return http(`${ServicePrefixEnum.CATEGORY}/${id}`, {
    method: RequestEnum.DELETE,
  });
}

export function getCategoryQuery(params: any) {
  const http = getHttp();
  // 构建查询字符串
  const queryString = new URLSearchParams(params).toString();

  return http(`${ServicePrefixEnum.CATEGORY}/query?${queryString}`, {
    method: RequestEnum.GET,
  });
}
