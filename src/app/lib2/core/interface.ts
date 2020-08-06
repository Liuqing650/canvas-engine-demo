import EventEmitter from '../core/emitter';

export interface AnyObject {
  [key: string]: any;
}

/**
 * 可以绑定事件的接口
 */
export interface IObservable {
  /**
   * 绑定事件
   * @param  eventName 事件名
   * @param callback  回调函数
   */
  on(eventName: string, callback: Function): EventEmitter;
  /**
   * 移除事件
   * @param eventName 事件名
   * @param callback  回调函数
   */
  off(eventName: string, callback?: Function): EventEmitter;
  /**
   * 触发事件, trigger 的别名函数
   * @param eventName 事件名称
   * @param eventObject 参数
   */
  emit(eventName: string, eventObject: object): void;

  getEvents(): any;
}

export interface GBase extends IObservable {
  cfg: AnyObject;

  /**
   * 是否销毁
   */
  destroyed: boolean;

  get(key: string): any;

  set(key: string, value: any): void;
  /**
   * 销毁对象
   */
  destroy(): void;
}

export interface GElement extends GBase {
  draw(): void;
}
