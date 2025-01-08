import { ServicePrefixEnum } from '~/enums/commonEnum';
import { getHttp } from './http';
import { RequestEnum } from '~/enums/httpEnum';

export function createCategory(data: any) {
  const http = getHttp();
  return http(`${ServicePrefixEnum.CATEGORY}/create`, {
    method: RequestEnum.POST,
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
