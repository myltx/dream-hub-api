import { ServicePrefixEnum } from '~/enums/commonEnum';
import { getHttp } from './http';
import { RequestEnum } from '~/enums/httpEnum';

export function createFavorites(data: any) {
  const http = getHttp();
  return http(`${ServicePrefixEnum.FAVORITES}`, {
    method: RequestEnum.POST,
    body: data,
  });
}

export function removeFavorites(id: string) {
  const http = getHttp();
  return http(`${ServicePrefixEnum.FAVORITES}/${id}`, {
    method: RequestEnum.DELETE,
  });
}
