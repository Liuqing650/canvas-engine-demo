import { ItemBase } from './item';

export class Node extends ItemBase {

  public type = 'node';

  constructor(cfg: any) {
    super(cfg);
  }

  public draw() {
    this.setPosition();
    this.graph.appendElement(this.container);
  }

  public getType() {
    return this.type;
  }
}
