
import { isBrowser, isString } from '../../util/util';
import { GCanvas } from '../../interface';
import { Base } from './base';

const PX_SUFFIX = 'px';

// 定义一个抽象画布，交给具体实现类去实现该抽象过程
export abstract class AbstractCanvas extends Base implements GCanvas {

  constructor(cfg: any) {
    super(cfg);
    this.initContainer();
    this.initDom();
    this.initEvents();
    this.initShape();
  }

  getDefaultCfg() {
    const cfg = super.getDefaultCfg();
    cfg['cursor'] = 'default';
    return cfg;
  }
  /**
   * @protected
   * 初始化容器
   */
  initContainer() {
    let container = this.get('container');
    if (isString(container)) {
      container = document.getElementById(container);
      this.set('container', container);
    }
  }


  /**
   * @protected
   * 初始化 DOM
   */
  initDom() {
    const element = this.createDom();
    this.set('el', element);
    // 附加到容器
    const container = this.get('container');
    container.appendChild(element);
    // 设置初始宽度
    this.setDOMSize(this.get('width'), this.get('height'));
  }
  /**
   * @protected
   * 初始化绑定的事件
   */
  initEvents() {}

  /**
   * @protected
   * 初始化形状
   */
  initShape() {}

  /**
   * 修改画布对应的 DOM 的大小
   * @param {number} width  宽度
   * @param {number} height 高度
   */
  setDOMSize(width: number, height: number) {
    const el = this.get('el');
    if (isBrowser) {
      el.style.width = width + PX_SUFFIX;
      el.style.height = height + PX_SUFFIX;
    }
  }

  /**
   * 创建画布容器
   * @return {HTMLElement} 画布容器
   */
  abstract createDom(): HTMLElement | SVGSVGElement;

  /**
   * 获取引擎信息
   */
  get engine() {
    return 'canvas';
  }

  /**
   * 清除画布
   */
  clear() {}

  destroy() {
    if (this.get('destroyed')) {
      return;
    }
    this.clear();
    super.destroy();
  }
}
