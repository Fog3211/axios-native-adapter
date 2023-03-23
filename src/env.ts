const ua =
  typeof navigator === 'undefined'
    ? ''
    : navigator.userAgent;;

export const isIOS = /iPhone|iPad|iPod/i.test(ua);
export const isAndroid = /Android/i.test(ua);

// 自定义判断app的逻辑
export const isInApp = /kanqiu/i.test(ua);
