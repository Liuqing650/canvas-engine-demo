import { GItem, ItemType } from '../../interface';
import { Base } from './base';

export abstract class AbstractItem extends Base implements GItem {

  constructor(cfg: any) {
    super(cfg);
  }

  type: ItemType = 'item';

  getType() {
    return this.type;
  }

  hit(x: number, y: number, padding?: number | number[]): boolean {
    return false;
  }

  getHitPadding(padding?: number | number[]): number[] {

    const defaultPadding = [0, 0, 0, 0];

    if (!padding) {
      return defaultPadding;
    }

    const type = typeof padding;

    // 当只有一个数字时
    if (type === 'number') {
      const intPadding = Math.floor(padding as number);
      return [intPadding, intPadding, intPadding, intPadding] as number[];
    }

    // 当是一个数组时
    if (type === 'object' && Array.isArray(padding)) {
      const length = padding.length;

      if (length === 0) {
        return defaultPadding;
      }
      const left = padding[0] || 0;
      const top = padding[1] || 0;
      const right = padding[1] || 0;
      const bottom = padding[1] || 0;

      // 数组模仿css的padding取值
      if (length === 1) {
        return [left, left, left, left] as number[];
      }

      // 如果是两个数字,那么第一个数字代表顶部和底部,第二个数字表示两边
      if (length === 2) {
        return [top, left, top, left] as number[];
      }

      // 如果是3个数字,那么前两个数字分别代表顶部和底部,第三个数字表示两边
      if (length === 3) {
        return [right, left, right, top] as number[];
      }

      if (length >= 4) {
        return [left, top, right, bottom] as number[];
      }
    }

    return defaultPadding;
  }
}
