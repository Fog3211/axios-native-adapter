/**
 * 客户端代理请求
 */

import type { AxiosRequestConfig } from 'axios';

export interface NativeRequestProps extends AxiosRequestConfig {

}

export const nativeRequest = async (options?: NativeRequestProps): Promise<{
  status: number,
  statusText: string
  data: unknown
}> => {
  return new Promise((reslove, reject) => {
    console.log(options)
    // mock a native request by bridge
    Promise.resolve({
      status: 200,
      statusText: 'OK',
      data: {}
    }).then(res => {
      reslove({
        status: res.status,
        statusText: res.statusText,
        data: res.data
      });
    }).catch(reject);
  });
};
