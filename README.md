# axios-native-adapter

使用这个SDK可以实现客户端代理请求，用法与`axios`基本一致，只需要在生成`axios`实例的时候设置一下`adapter`就好。

## 使用方法

### 设置axios的adapter

``` tsx
import { initAdapter } from './init-adapter';
// 创建一个axios实例并设置适配器

const instance = axios.create({
  baseURL: 'http://example.com/api',
  adapter: initAdapter({
    enable: true, // 或者传入一个函数，用于判断是否需要使用原生适配器
  }),
});

// 剩下的和axios用法一致
instance.get('/users')
  .then(function (res) {
    console.log(res);
  })
  .catch(function (error) {
    console.log(error);
  });

```

### 配置参数

``` ts
type InitAdapterOptions = {
  enable?: boolean | ((config: AxiosRequestConfig) => boolean)
}
```

enable：用于判断是否需要使用客户端请求。

可以传入一个布尔值或一个函数，该函数接收一个`AxiosRequestConfig`对象，返回一个布尔值。如果返回true，则使用客户端请求，否则使用默认适配器。默认值根据UA自动判断。

## 优势

1. 绕过浏览器跨域限制
2. 处理客户端登录后cookie注入慢的问题
3. 更安全，借助客户端签名机制，可以做到接口不被三方恶意调用
