import { AbstractItem } from '../../core/abstract';
import { BBox } from '../bbox';
import { ItemType, ShapeAttrs, ItemConfig, ShapeModelOption, ModelConfig } from '../../interface';
import { applyAttrsToContext } from '../../util/draw';

export abstract class Item extends AbstractItem {

  public id: string;

  public rotate = 0;
  public offsetRotate = 0;
  public bbox: BBox = new BBox(0, 0, 0, 0);

  public attr?: ShapeAttrs = {};

  public model: ItemConfig;
  /**
   * 类型
   * @type {string}
   */
  public type: ItemType = 'item';

  constructor(cfg: any) {
    super(cfg);
  }

  public getType() {
    return this.type;
  }

  abstract draw(ctx: CanvasRenderingContext2D): void;

  hit(x: number, y: number, padding?: number | number[]): boolean {
    const pad = this.getHitPadding(padding);
    const left = pad[0];
    const top = pad[1];
    const right = pad[2];
    const bottom = pad[3];
    const boxMinX = this.bbox.minX - left;
    const boxMinY = this.bbox.minY - top;
    const boxMaxX = this.bbox.maxX + right;
    const boxMaxY = this.bbox.maxY + bottom;
    if ((x >= boxMinX && x <= boxMaxX) && (y >= boxMinY && y <= boxMaxY)) {
      return true;
    }
    return false;
  }

  public getAttr() {
    this.attr.x = this.model.x || 0;
    this.attr.y = this.model.y || 0;
    this.attr.style = this.model.style || {};
    this.attr.labelStyle = this.model.labelStyle || {};
    return this.attr;
  }

  public setAttr(ctx: CanvasRenderingContext2D, attr: any) {
    applyAttrsToContext(ctx, attr);
  }

  public getModel(): ModelConfig {
    return this.model;
  }

  public getShapeModelOption(): ShapeModelOption {
    const shapeModelOption: ShapeModelOption = {
      style: this.model.style,
      labelStyle: this.model.labelStyle,
    };
    this.getAttr();
    return shapeModelOption;
  }
}
