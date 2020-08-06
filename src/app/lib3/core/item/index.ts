import { AbstractItem } from '../abstract/item';
import { GItemModel } from '../abstract/interface';

export class Item extends AbstractItem {
  
  public id: string;

  constructor(option: GItemModel) {
    super(option);
  }

  public draw(ctx: CanvasRenderingContext2D) {

  }

  public bbox() {
  }
}