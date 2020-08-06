import { Point } from '../point';
import { pointInBBox } from '../../util';
import { NodeConfig } from '../../interface';

export class BBox {
  public x: number;
  public y: number;
  public minX: number;
  public minY: number;
  public maxX: number;
  public maxY: number;
  public width: number;
  public height: number;
  public center: Point = new Point(0, 0);

  constructor(x: number, y: number, width: number, height: number) {
    this.init(x, y, width, height);
  }

  private init(x: number, y: number, width: number, height: number) {
    this.width = width < 0 ? 0 : width;
    this.height = height < 0 ? 0 : height;
    this.x = x;
    this.y = y;
    this.minX = x;
    this.minY = y;
    this.maxX = this.x + this.width;
    this.maxY = this.y + this.height;
    this.calceCenter();
  }

  public clone(): BBox {
    return new BBox(this.x, this.y, this.width, this.height);
  }

  public update(model: NodeConfig) {
    this.init(model.x, model.y, model.width, model.height);
  }

  public calceCenter() {
    this.center.x = this.x + this.width / 2;
    this.center.y = this.y + this.height / 2;
  }

  public hit(pt: Point, padding = 0) {
    return pt.x > this.x - padding && pt.x < this.maxX + padding && pt.y > this.y - padding && pt.y < this.maxY + padding;
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
