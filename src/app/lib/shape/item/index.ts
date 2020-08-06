import { AbstractItem } from '../../core/abstract';
import { BBox } from '../bbox';
import { ItemType, ShapeAttrs, ItemConfig, ShapeModelOption, ModelConfig, BBoxConfig } from '../../interface';
import { applyAttrsToContext } from '../../util/draw';
import { Point } from '../point';

const DefaultAnchorStyle = {
  fillStyle: '#fff',
  strokeStyle: '#f00',
};

export abstract class Item extends AbstractItem {

  public id: string;

  public rotate = 0;
  public offsetRotate = 0;
  public bbox: BBox = new BBox({x: 0, y: 0, width: 0, height: 0});

  public attr?: ShapeAttrs = {};

  public model: ItemConfig;

  public shapes: BBox[] = [];

  public target: any;
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

  public hit(x: number, y: number, padding?: number | number[]): boolean {
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

  public hitShape(x: number, y: number, padding?: number): BBox {
    const shapes = this.shapes || [];
    if (shapes && shapes.length === 0) {
      return undefined;
    }
    for (let idx = 0; idx < shapes.length; idx++) {
      const bbox: BBox = shapes[idx];
      if (bbox.hit(x, y, padding)) {
        return bbox;
      }
    }
  }

  public getAttr() {
    this.attr.x = this.model.x || 0;
    this.attr.y = this.model.y || 0;
    this.attr.style = this.model.style || {};
    this.attr.labelStyle = this.model.labelStyle || {};
    return this.attr;
  }

  public getBBox(): BBox {
    return this.bbox;
  }

  public setAttr(ctx: CanvasRenderingContext2D, attr: any) {
    applyAttrsToContext(ctx, attr);
  }

  public getModel(): ModelConfig {
    return this.model;
  }

  public getShapeModelOption(): ShapeModelOption {
    const shapeModelOption: ShapeModelOption = {
      style: this.model.style || {},
      labelStyle: this.model.labelStyle || {},
      anchorStyle: this.model.anchorStyle || DefaultAnchorStyle,
    };
    this.getAttr();
    return shapeModelOption;
  }

  public addShape(bbox: BBox) {
    // 添加子元素
    this.shapes.push(bbox);
  }

  public generateBBox(config: BBoxConfig): BBox {
    const bbox: BBox = new BBox(config);
    return bbox;
  }
}
