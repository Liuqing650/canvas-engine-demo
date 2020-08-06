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

/**
 * 图形元素的基类
 */
export interface GCanvas extends GBase {

  /** 绘制图形 */
  destroy(): void;
}

/**
 * 图形元素的基类
 */
export interface GItem extends GBase {
  /**
   * 图形拾取
   * @param {number} x x 坐标
   * @param {number} y y 坐标
   * @param {number | number[]} padding 间距
   * @returns 是否已被拾取
   */
  hit(x: number, y: number, padding?: number | number[]): boolean;
}


/**
 * 形状
 */
export interface GShape extends GBase {
  /**
   * 图形拾取
   * @param {number} x x 坐标
   * @param {number} y y 坐标
   * @returns 是否已被拾取
   */
  hit(x: number, y: number): boolean;
}
