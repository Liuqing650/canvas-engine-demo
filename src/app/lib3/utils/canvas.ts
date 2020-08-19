const SHAPE_ATTRS_MAP = {
  fill: 'fillStyle',
  stroke: 'strokeStyle',
  opacity: 'globalAlpha',
};

export function applyAttrsToContext(context: CanvasRenderingContext2D, arrts: object) {
  for (const key in arrts) {
    // 转换不与 canvas 兼容的属性名
    const name = SHAPE_ATTRS_MAP[key] ? SHAPE_ATTRS_MAP[key] : key;
    context[name] = arrts[key];
  }
}

export function pointInBBox(point: {x: number, y: number}, vertices: {x: number, y: number}[]): boolean {
  if (vertices.length < 3) {
    return false;
  }
  let isIn = false;

  let last = vertices[vertices.length - 1];
  for (const item of vertices) {
    if ((item.y < point.y && last.y >= point.y) || (item.y >= point.y && last.y < point.y)) {
      if (item.x + ((point.y - item.y) * (last.x - item.x)) / (last.y - item.y) > point.x) {
        isIn = !isIn;
      }
    }

    last = item;
  }

  return isIn;
}
