import { NodeOption, ShapeOption } from '../../interface';
import { merge, applyAttrsToContext } from '../../utils';
import { Node } from '../../modules/node';

export const baseNode: ShapeOption = {
  option: {
    style: {
      fillStyle: '#0000ff',
      strokeStyle: '#222',
    },
    labelStyle: {
      color: '#f00',
      fontFamily: '"Hiragino Sans GB", "Microsoft YaHei", "Helvetica Neue", Helvetica, Arial',
      fontSize: 12,
      lineHeight: 1.5,
      fontStyle: 'normal',
      fontWeight: 'normal',
      textAlign: 'center',
      textBaseline: 'middle',
      background: ''
    },
  },
  getOptions(option: NodeOption) {
    return merge(this.option, option);
  },
  draw(ctx: CanvasRenderingContext2D, node: Node) {
    // 绘制包裹区域
    this.drawContainer(ctx, node);
    // 绘制文字
    // this.drawText(ctx, node);
  },
  drawContainer(ctx: CanvasRenderingContext2D, node: Node) {
    const option = node.getOption();
    const { style } = this.getOptions(option);
    const bbox = node.getBBox();
    ctx.save();
    ctx.beginPath();
    ctx.ellipse(
      bbox.center.x,
      bbox.center.y,
      bbox.width / 2,
      bbox.height / 2,
      0,
      0,
      Math.PI * 2
    );
    this.attr(ctx, style);
    ctx.fill();
    ctx.stroke();
    ctx.restore();
    console.log('bbox------>', bbox);
    console.log('绘制图像', style);
  },
  attr(ctx: CanvasRenderingContext2D, attr: object) {
    applyAttrsToContext(ctx, attr);
  }
};

