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

export function getFileQuery(params: any) {
  const http = getHttp();
  // 构建查询字符串
  const queryString = new URLSearchParams(params).toString();

  return http(`${ServicePrefixEnum.FILE}/query?${queryString}`, {
    method: RequestEnum.GET,
  });
}

export function delFile(id: string) {
  const http = getHttp();
  return http(`${ServicePrefixEnum.FILE}/${id}`, {
    method: RequestEnum.DELETE,
  });
}

export function uploadFile(data: { file: File; type: 'image' | 'markdown' }) {
  const http = getHttp();
  // 构造 FormData
  const formData = new FormData();
  formData.append('file', data.file);
  formData.append('type', data.type);
  return http(`${ServicePrefixEnum.FILE}/upload`, {
    method: RequestEnum.POST,
    body: formData,
  });
}
