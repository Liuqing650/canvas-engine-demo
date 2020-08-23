import { AbstractItem } from '../../core/abstract/item';
import { ShapeOption, ItemOption } from '../../interface';
import { Shape } from '../../shapes';
import { BBox, BBoxOption } from './bbox';
import { derivativeStyle, uuid8 } from '../../utils';

export abstract class Item extends AbstractItem {

  public id: string;

  // 形状类型，与图形分类紧密相关，如 节点、边等
  public shapeType: 'node' | 'edge';

  public bbox: BBox;

  public status = new Set<string>();

  constructor(option: ItemOption) {
    super(option);
    this.initItem();
  }

  public initItem() {
    const bboxOption: BBoxOption = this.getBboxOption();
    this.bbox = new BBox(bboxOption);
    const id = this.get('id');
    this.id = id || uuid8();
  }

  public draw(ctx: CanvasRenderingContext2D) {
    const shapeName = this.get('shapeName');
    const self = this;
    const shape = this.getShapeOption();
    if (!shape) {
      console.warn('没有获取到有效的图形', shapeName, this.shapeType);
      return null;
    }
    shape.draw(ctx, self);
  }

  public getShapeOption(): ShapeOption {
    return Shape.getShape(this.shapeType, this.get('shapeName'));
  }

  abstract getBboxOption(): BBoxOption;

  /** 碰撞检测 */
  public hit(x: number, y: number, padding?: number | number[]): boolean {
    const pad = this.getHitPadding(padding);
    const left = pad[0];
    const top = pad[1];
    const right = pad[2];
    const bottom = pad[3];
    const bbox = this.getBBox();
    const boxMinX = bbox.minX - left;
    const boxMinY = bbox.minY - top;
    const boxMaxX = bbox.maxX + right;
    const boxMaxY = bbox.maxY + bottom;
    if ((x >= boxMinX && x <= boxMaxX) && (y >= boxMinY && y <= boxMaxY)) {
      return true;
    }
    return false;
  }

  public getHitPadding(padding?: number | number[]): number[] {
    return derivativeStyle(padding);
  }

  public updateBBox() {
    const bboxOption: BBoxOption = this.getBboxOption();
    this.bbox.update(bboxOption);
  }

  public getBBox() {
    return this.bbox;
  }

  public translate(x: number, y: number) {
    const bbox = this.getBBox();
    this.set('x', bbox.x + x);
    this.set('y', bbox.y + y);
    this.updateBBox();
  }

  public setStatus(status: string, active?: boolean) {
    if (active) {
      if (!this.status.has(status)) {
        this.status.add(status);
      }
      return;
    }
    this.status.delete(status);
  }

  public getStatus(status?: string): string[] | boolean {
    if (status) {
      return this.status.has(status);
    }
    const output: string[] = [];
    this.status.forEach((statu) => {
      output.push(statu);
    });
    return output;
  }

  public hide() {
    this.set('hide', true);
  }

  public show() {
    this.set('hide', false);
  }

  public isShow() {
    const isHide = this.get('hide');
    return !isHide;
  }
}
