export function getPixelRatio() {
  return window ? window.devicePixelRatio : 1;
}

export const isBrowser = typeof window !== 'undefined' && typeof window.document !== 'undefined';

export function isString(data: any) {
  return typeof data === 'string';
}

export function isNil(value: any) {
  return value === null || value === undefined;
}

export function toString(value: any) {
  if (isNil(value)) {
    return '';
  }
  return value.toString();
}

// 首字母大写
export function upperFirst(value: string) {
  const str = toString(value);
  return str.charAt(0).toUpperCase() + str.substring(1);
}

/**
 * 数组节流 throttleArray
 * 属于一个异步执行函数
 * @param arr 数组
 * @param cb 回调函数
 * @param count 一次render的个数
 * @param interval 一次render的时长
 */
export function throttleArray(arr: any[], cb: Function, count: number, interval: number): void {
  let timer: any;
  let index = 1;
  const length = arr.length;
  function start() {
    for (let idx = 0; idx < Math.min(count || 1, length - index); idx++) {
      const item = arr[index - 1];
      index++;
      cb(item);
    }
  }
  function loop() {
    timer = setInterval(() => {
      if (length - index === 0) {
        clearInterval(timer);
      }
      start();
    }, interval || 200);
  }
  loop();
}
/**
 * 数组节流 throttleArray
 * 属于一个异步执行函数
 * @param arr 数组
 * @param cb 回调函数
 * @param count 一次render的个数
 * @param interval 一次render的时长
 * @return 返回一个执行函数,以便控制何时开始
 */
export function throttleArrayFunc(arr: any[], cb: Function, count: number, interval: number) {
  let timer: any;

  function start() {
    for (let idx = 0; idx < Math.min(count || 1, arr.length); idx++) {
      const item = arr.shift();
      cb(item);
    }
  }
  function loop() {
    timer = setInterval(() => {
      if (arr.length === 0) {
        clearInterval(timer);
      }
      start();
    }, interval || 200);
  }
  return loop;
}
