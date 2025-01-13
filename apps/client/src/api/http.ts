import type { $Fetch } from 'ofetch';

import { useRuntimeConfig } from '#app';
import { ofetch } from 'ofetch';

import { getToken, signOut } from '~/services/auth';

let http: $Fetch;
export function setupHttp() {
  if (http) return http;

  const config = useRuntimeConfig();
  const baseURL = config.public.apiBase as string;

  http = ofetch.create({
    baseURL,
    headers: { 'Content-Type': 'application/json' },
    async onRequest({ options }) {
      const token = await getToken();
      options.headers = {
        ...options.headers,
        Authorization: `Bearer ${token || ''}`,
        'Content-Type': 'application/json',
      };
    },
    async onResponseError({ request, response, options }) {
      const { message, statusCode } = response._data;
      const toast = useToast();
      // const modal = useModal()
      if (statusCode === 401 && message === 'Invalid or expired token') {
        toast.add({
          title: 'Error',
          description: '登录失效，请重新登录',
          color: 'red',
        });
        signOut();
        return;
      }
      if (Array.isArray(message)) {
        message.forEach((item) => {
          httpStatusErrorHandler?.(item, response.status);
        });
      } else {
        httpStatusErrorHandler?.(message, response.status);
      }
      return Promise.reject(response._data);
    },
    retry: 3,
    retryDelay: 1000,
  });
}

type HttpStatusErrorHandler = (message: string, statusCode: number) => void;
let httpStatusErrorHandler: HttpStatusErrorHandler = (
  message: string,
  statusCode: number
) => {
  const toast = useToast();
  toast.add({
    title: statusCode.toString(),
    description: message,
    color: 'red',
  });
};

export function injectHttpStatusErrorHandler(handler: HttpStatusErrorHandler) {
  httpStatusErrorHandler = handler;
}

export function getHttp() {
  if (!http) {
    throw new Error('HTTP client not initialized. Call setupHttp first.');
  }
  return http;
}
