import { ServicePrefixEnum } from '~/enums/commonEnum';
import { getHttp } from './http';
import { RequestEnum } from '~/enums/httpEnum';

export function getFileDetails(params: { id: string; type: string }) {
  const http = getHttp();
  const queryString = new URLSearchParams(params).toString();
  return http(`${ServicePrefixEnum.FILE}/detail?${queryString}`, {
    method: RequestEnum.GET,
  });
}
