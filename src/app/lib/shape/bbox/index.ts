import { Point } from '../point';
import { pointInBBox } from '../../util';
import { NodeConfig, BBoxConfig } from '../../interface';

export class BBox {
  public x: number;
  public y: number;
  public minX: number;
  public minY: number;
  public maxX: number;
  public maxY: number;
  public width: number;
  public height: number;
  public name?: string;
  public zIndex?: number;
  public anchorIndex?: number;
  public center: Point = new Point(0, 0);

  constructor(cfg: BBoxConfig) {
    this.init(cfg);
  }

  private init(cfg: BBoxConfig) {
    this.width = cfg.width < 0 ? 0 : cfg.width;
    this.height = cfg.height < 0 ? 0 : cfg.height;
    this.x = cfg.x << 0;
    this.y = cfg.y << 0;
    this.minX = this.x;
    this.minY = this.y;
    this.maxX = this.x + this.width;
    this.maxY = this.y + this.height;
    this.name = cfg.name || this.name || '';
    this.zIndex = cfg.zIndex;
    this.anchorIndex = cfg.anchorIndex;
    this.calceCenter();
  }

  public clone(): BBox {
    const config: BBoxConfig = {
      x: this.x,
      y: this.y,
      width: this.width,
      height: this.height,
    };
    return new BBox(config);
  }

  public update(model: NodeConfig) {
    const cfg: BBoxConfig = {
      x: model.x,
      y: model.y,
      width: model.width,
      height: model.height,
    };
    this.width = cfg.width < 0 ? 0 : cfg.width;
    this.height = cfg.height < 0 ? 0 : cfg.height;
    this.x = cfg.x << 0;
    this.y = cfg.y << 0;
    this.minX = this.x;
    this.minY = this.y;
    this.maxX = this.x + this.width;
    this.maxY = this.y + this.height;
    this.calceCenter();
  }

  public calceCenter() {
    this.center.x = this.x + this.width / 2;
    this.center.y = this.y + this.height / 2;
  }

  public hit(x: number, y: number, padding = 0) {
    return x > this.minX - padding && x < this.maxX + padding && y > this.minY - padding && y < this.maxY + padding;
  }

  public hitBBox(bbox: BBox) {
    return (
      (bbox.x > this.x && bbox.x < this.maxX && bbox.y > this.y && bbox.y < this.maxY) ||
      (bbox.maxX > this.x && bbox.maxX < this.maxX && bbox.y > this.y && bbox.y < this.maxY) ||
      (bbox.maxX > this.x && bbox.maxX < this.maxX && bbox.maxY > this.y && bbox.maxY < this.maxY) ||
      (bbox.x > this.x && bbox.x < this.maxX && bbox.maxY > this.y && bbox.maxY < this.maxY)
    );
  }

  public hitRotate(point: Point, rotate: number, center: Point) {
    const pts = this.toBBoxs();
    for (const pt of pts) {
      pt.rotate(rotate, center);
    }

    return pointInBBox(point, pts);
  }

  public toBBoxs() {
    return [
      new Point(this.x, this.y),
      new Point(this.maxX, this.y),
      new Point(this.maxX, this.maxY),
      new Point(this.x, this.maxY)
    ];
  }

  public translate(x: number, y: number) {
    this.x += x;
    this.y += y;
    this.maxX += x;
    this.maxY += y;
    this.calceCenter();
  }

  public scale(scale: number, center?: Point, scaleY?: number) {
    if (!center) {
      center = this.center;
    }

    if (scaleY === undefined) {
      scaleY = scale;
    }

    this.x = center.x - (center.x - this.x) * scale;
    this.y = center.y - (center.y - this.y) * scaleY;
    this.width *= scale;
    this.height *= scaleY;
    this.maxX = this.x + this.width;
    this.maxY = this.y + this.height;
    this.calceCenter();
  }
}
