import { ItemBase } from './item';

export class Edge extends ItemBase {

  public type = 'edge';

  constructor(cfg: any) {
    super(cfg);
  }

  public draw() {
    const bbox = this.bbox;
    this.canvas.style.left = `${bbox.minX}px`;
    this.canvas.style.top = `${bbox.minY}px`;
    this.canvas.style.right = `${bbox.maxX}px`;
    this.canvas.style.bottom = `${bbox.maxY}px`;
    this.canvas.width = bbox.width;
    this.canvas.height = bbox.height;
    this.graph.appendElement(this.container);
  }

  public getType() {
    return this.type;
  }
}
