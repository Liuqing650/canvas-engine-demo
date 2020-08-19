import { AbstractItem } from '../abstract/item';
import { GItemOption } from '../abstract/interface';

export class Item extends AbstractItem {

  public id: string;

  constructor(option: GItemOption) {
    super(option);
  }

  public draw(ctx: CanvasRenderingContext2D) {}

  public bbox() {
  }
}
