import { ShapeOption } from 'src/app/lib/interface';
import { Node } from '../../nodes';
import { BBox } from 'src/app/lib/shape/bbox';
import { merge } from 'src/app/lib/util';

export const baseShape: ShapeOption = {
  getDefaultOptions() {
    return {
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
      }
    };
  },
  getOptions() {
    const defaultOptions = this.getDefaultOptions();
    return merge(defaultOptions, this.options);
  },
  getBBox(node: Node): BBox {
    return node.bbox;
  },
  draw(ctx: CanvasRenderingContext2D, node: Node) {
    // 绘制包裹区域
    this.drawContainer(ctx, node);
    // 绘制文字
    this.drawText(ctx, node);
  },
  drawContainer(ctx: CanvasRenderingContext2D, node: Node) {
    const { style } = this.getOptions();

    const bbox: BBox = this.getBBox(node);
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
    node.setAttr(ctx, style || {});
    ctx.fill();
    ctx.stroke();
    ctx.restore();
  },
  drawText(ctx: CanvasRenderingContext2D, node: Node) {
    const label = node.model.label;
    const bbox: BBox = this.getBBox(node);
    const { labelStyle } = this.getOptions();
    ctx.save();
    ctx.beginPath();
    node.setAttr(ctx, labelStyle || {});
    ctx.font = `${labelStyle.fontStyle || 'normal'} normal ${labelStyle.fontWeight || 'normal'} ${labelStyle.fontSize}px/${
      labelStyle.lineHeight
      } ${labelStyle.fontFamily}`;
    if (labelStyle.color) {
      ctx.fillStyle = labelStyle.color;
    } else {
      ctx.fillStyle = '#222';
    }
    ctx.fillText(label, bbox.center.x, bbox.center.y);
    ctx.restore();
  }
};
