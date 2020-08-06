import { ShapeOption, EdgeConfig } from 'src/app/lib/interface';
import { BBox } from 'src/app/lib/shape/bbox';
import { merge } from 'src/app/lib/util';
import { Edge } from '..';

export const baseShape: ShapeOption = {
  getDefaultOptions() {
    return {
      style: {
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
  getBBox(edge: Edge) {
    return edge.getEdgeBBox();
  },
  draw(ctx: CanvasRenderingContext2D, node: Edge) {
    // 绘制包裹区域
    this.drawContainer(ctx, node);
    // 绘制文字
    // this.drawText(ctx, node);
  },
  drawContainer(ctx: CanvasRenderingContext2D, node: Edge) {
    const { style } = this.getOptions();

    const { source, target } = this.getBBox(node);
    ctx.save();
    ctx.beginPath();
    ctx.moveTo(source.x, source.y);
    ctx.lineTo(target.x, target.y);
    node.setAttr(ctx, style || {});
    ctx.fill();
    ctx.stroke();
    ctx.restore();
  },
  drawText(ctx: CanvasRenderingContext2D, node: Edge) {
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
