import axios, { InternalAxiosRequestConfig } from "axios";

export type AdapterOptions = {
  enable?: boolean | ((config: InternalAxiosRequestConfig) => boolean)
}

export const adapter = (
  options: AdapterOptions
) => async (config: InternalAxiosRequestConfig) => {
  const { enable = true } = options
  const isUseOriginalAdapter = !(typeof enable === 'function' ? enable(config) : enable)

  if (!isUseOriginalAdapter) {
    return Promise.resolve({
      data: 11
    }).then((bridgeResponse) => {
      // 将bridgeResponse转换为Axios的响应格式
      return {
        data: bridgeResponse.data,
        status: 200,
        statusText: "OK",
        headers: config.headers,
        config: config,
        request: undefined,
      };
    });
  } else {

    // 调用默认的适配器处理需要删除自定义适配器，否则会死循环
    delete config.adapter
    return axios(config)
  }
}
