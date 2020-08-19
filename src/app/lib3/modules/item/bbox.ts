import { Point } from './point';
import { pointInBBox } from '../../utils';

export interface BBoxOption {
  x: number;
  y: number;
  width: number;
  height: number;
  name?: string;
  zIndex?: number;
  anchorIndex?: number;
}

export class BBox {
  public x: number;
  public y: number;
  public minX: number;
  public minY: number;
  public maxX: number;
  public maxY: number;
  public width: number;
  public height: number;
  public zIndex?: number;
  public center: Point = new Point(0, 0);

  constructor(option: BBoxOption) {
    this.init(option);
  }

  private init(option: BBoxOption) {
    this.width = option.width < 0 ? 0 : option.width;
    this.height = option.height < 0 ? 0 : option.height;
    this.x = option.x << 0;
    this.y = option.y << 0;
    this.minX = this.x;
    this.minY = this.y;
    this.maxX = this.x + this.width;
    this.maxY = this.y + this.height;
    this.zIndex = option.zIndex || 0;
    this.calceCenter();
  }

  public clone(): BBox {
    const config: BBoxOption = {
      x: this.x,
      y: this.y,
      width: this.width,
      height: this.height,
    };
    return new BBox(config);
  }

  public update(option: BBoxOption) {
    const cfg: BBoxOption = {
      x: option.x,
      y: option.y,
      width: option.width,
      height: option.height,
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
