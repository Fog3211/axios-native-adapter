import axios, { AxiosRequestConfig } from 'axios';
import { nativeRequest } from './native-request';
import { isInApp } from './env';

export type InitAdapterOptions = {
  enable?: boolean | ((config: AxiosRequestConfig) => boolean)
}

export const initAdapter = (
  options: InitAdapterOptions
) => {
  return (async (config: AxiosRequestConfig) => {
    const { enable = isInApp } = options;
    const isUseOriginalAdapter = !(typeof enable === 'function' ? enable(config) : enable);
    const { method = 'GET', baseURL = '', url } = config;

    if (!isUseOriginalAdapter) {
      const nativeMethod = method.toUpperCase();

      return nativeRequest({
        ...config,
        url: `${baseURL}${url}`,
        method: nativeMethod
      }).then((res) => {
        // 将bridgeResponse转换为Axios的响应格式
        return {
          data: res.data,
          status: res.status,
          statusText: res.statusText,
          headers: config.headers,
          config: config,
          request: undefined,
        };
      });
    } else {
      // 调用默认的适配器处理需要删除自定义适配器，否则会死循环
      delete config.adapter;
      return axios(config);
    }
  }) as AxiosRequestConfig['adapter'];
};
