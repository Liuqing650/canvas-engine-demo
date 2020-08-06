/**
 * Point
 */
export class Point {
  constructor(
    public x: number,
    public y: number,
  ) {}

  public floor() {
    this.x |= 0;
    this.y |= 0;
  }

  public round() {
    this.x = Math.round(this.x);
    this.y = Math.round(this.y);
  }

  public rotate(angle: number, center: { x: number; y: number; }): Point {
    if (!angle || angle === 360) {
      return this;
    }
    angle *= Math.PI / 180;
    const x = (this.x - center.x) * Math.cos(angle) - (this.y - center.y) * Math.sin(angle) + center.x;
    const y = (this.x - center.x) * Math.sin(angle) + (this.y - center.y) * Math.cos(angle) + center.y;
    this.x = x;
    this.y = y;
    return this;
  }

  public hit(pt: Point, radius = 5) {
    return pt.x > this.x - radius && pt.x < this.x + radius && pt.y > this.y - radius && pt.y < this.y + radius;
  }
}
