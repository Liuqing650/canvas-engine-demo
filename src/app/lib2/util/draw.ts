
const SHAPE_ATTRS_MAP = {
  fill: 'fillStyle',
  stroke: 'strokeStyle',
  opacity: 'globalAlpha',
};

export function applyAttrsToContext(context: CanvasRenderingContext2D, arrts: any) {
  for (const key in arrts) {
    // 转换不与 canvas 兼容的属性名
    const name = SHAPE_ATTRS_MAP[key] ? SHAPE_ATTRS_MAP[key] : key;
    context[name] = arrts[key];
  }
}
