import { ShapeOption } from "../interface";
import { Shape } from '../shape';

const baseNode: ShapeOption = {
  option: {},
  draw(ctx: CanvasRenderingContext2D, node: any) {
    // 绘制包裹区域
    this.drawContainer(ctx, node);
    // 绘制文字
    // this.drawText(ctx, node);
  },
  drawContainer(ctx: CanvasRenderingContext2D, node: any) {
    console.log('绘制图像');
  },
};

Shape.registerNode('base-node', baseNode);
