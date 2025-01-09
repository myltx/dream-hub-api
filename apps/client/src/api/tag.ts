import { ServicePrefixEnum } from '~/enums/commonEnum';
import { getHttp } from './http';
import { RequestEnum } from '~/enums/httpEnum';

export function createTag(data: any) {
  const http = getHttp();
  return http(`${ServicePrefixEnum.TAG}`, {
    method: RequestEnum.POST,
    body: data,
  });
}

export function updateTag(id: string, data: any) {
  const http = getHttp();
  return http(`${ServicePrefixEnum.TAG}/${id}`, {
    method: RequestEnum.PATCH,
    body: data,
  });
}

export function getTag() {
  const http = getHttp();
  return http(`${ServicePrefixEnum.TAG}`, {
    method: RequestEnum.GET,
  });
}

export function getTagList() {
  const http = getHttp();
  return http(`${ServicePrefixEnum.TAG}/public`, {
    method: RequestEnum.GET,
  });
}

export function delTag(id: string) {
  const http = getHttp();
  return http(`${ServicePrefixEnum.TAG}/${id}`, {
    method: RequestEnum.DELETE,
  });
}

export function getTagQuery(params: any) {
  const http = getHttp();
  // 构建查询字符串
  const queryString = new URLSearchParams(params).toString();

  return http(`${ServicePrefixEnum.TAG}/query?${queryString}`, {
    method: RequestEnum.GET,
  });
}
