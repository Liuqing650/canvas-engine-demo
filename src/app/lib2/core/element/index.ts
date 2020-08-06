import { AbstractElement } from '../abstract';


export class Element extends AbstractElement {

  constructor(cfg: any) {
    super(cfg);
    this.init();
  }

  getDefaultCfg() {
    return {
      width: 500,
      height: 500,
    };
  }

  public init() {
    this.initContainer();
  }

  /** 初始化容器 */
  public initContainer() {
    const width = this.get('width');
    const height = this.get('height');
    this.setDomSize(width, height);
    this.resetContainerStyle();
  }

  /** 修改容器尺寸 */
  public setDomSize(width: string | number, height: string | number) {
    const container: HTMLElement = this.get('container');
    const widthStr: string = typeof width === 'number' ? `${width}px` : width;
    const heightStr: string = typeof height === 'number' ? `${height}px` : height;
    container.style.width = widthStr;
    container.style.height = heightStr;
  }

  /** 修改容器基础样式 */
  public resetContainerStyle() {
    const container: HTMLElement = this.get('container');
    container.style.position = 'relative';
    container.style.overflow = 'hidden';
  }
}
