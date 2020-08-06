import { ShapeOption } from 'src/app/lib/interface';
import { Node } from '../../nodes';
import { parseRadius } from 'src/app/lib/util/parse';
import { BBox } from 'src/app/lib/shape/bbox';

export const rectShape: ShapeOption = {
  getBBox(node: Node): BBox {
    return node.bbox;
  },
  drawContainer(ctx: CanvasRenderingContext2D, node: Node) {
    const attrs = node.getAttr();
    const { style } = this.getOptions();

    const x = attrs.x;
    const y = attrs.y;
    const width = attrs.width;
    const height = attrs.height;
    const radius = attrs.radius || 0;

    ctx.save();
    ctx.beginPath();
    if (radius === 0) {
      // 修复特殊属性,当 fillStyle 存在时,表示需要构建一个矩形
      if (style.fillStyle) {
        ctx.fillStyle = style.fillStyle;
        ctx.fillRect(x, y, width, height);
      } else {
        ctx.rect(x, y, width, height);
      }
      node.setAttr(ctx, style || {});
      ctx.stroke();
    } else {
      const [r1, r2, r3, r4] = parseRadius(radius);
      ctx.moveTo(x + r1, y);
      ctx.lineTo(x + width - r2, y);
      if (r2 !== 0) {
        ctx.arc(x + width - r2, y + r2, r2, -Math.PI / 2, 0);
      }
      ctx.lineTo(x + width, y + height - r3);
      if (r3 !== 0) {
        ctx.arc(x + width - r3, y + height - r3, r3, 0, Math.PI / 2);
      }
      ctx.lineTo(x + r4, y + height);
      if (r4 !== 0) {
        ctx.arc(x + r4, y + height - r4, r4, Math.PI / 2, Math.PI);
      }
      ctx.lineTo(x, y + r1);
      if (r1 !== 0) {
        ctx.arc(x + r1, y + r1, r1, Math.PI, Math.PI * 1.5);
      }
      node.setAttr(ctx, style || {});
      ctx.closePath();
    }
    ctx.restore();
  },
};
