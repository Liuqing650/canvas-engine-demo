import { AbstractCanvas } from '../abstract/canvas';
import { getPixelRatio } from '../../utils';

export class Canvas extends AbstractCanvas {

  public createCanvas(): HTMLCanvasElement {
    const element = document.createElement('canvas');
    element.style.position = 'absolute';
    element.style.left = '0';
    element.style.top = '0';
    element.style.outline = 'none';
    return element;
  }

  public clearCanvas() {
    const context = this.ctx;
    const element = this.canvasElement;
    context.clearRect(0, 0, element.width, element.height);
  }

  public setCanvasSize(width: number, height: number) {
    super.setCanvasSize(width, height);
    // 实现高清绘制
    const ctx = this.ctx;
    const el = this.canvasElement;
    const pixelRatio = this.getPixelRatio();
    el.width = pixelRatio * width;
    el.height = pixelRatio * height;
    // 设置 canvas 元素的宽度和高度，会重置缩放，因此 context.scale 需要在每次设置宽、高后调用
    if (pixelRatio > 1) {
      ctx.scale(pixelRatio, pixelRatio);
    }
  }

  /**
   * 获取屏幕像素比
   */
  public getPixelRatio() {
    const pixelRatio = this.get('pixelRatio') || getPixelRatio();
    // 不足 1 的取 1，超出 1 的取整
    return pixelRatio >= 1 ? Math.floor(pixelRatio) : 1;
  }
}
