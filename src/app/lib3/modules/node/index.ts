import { Item } from '../item';
import { NodeOption } from '../../interface/item';

export class Node extends Item {
  constructor(option: NodeOption) {
    super(option);
    this.shapeType = 'node';
  }

  public getOption(): NodeOption {
    return this.option as NodeOption;
  }

  public getBboxOption() {
    const option = this.getOption();
    const bboxOption = {
      x: option.x,
      y: option.y,
      width: option.width,
      height: option.height,
    };
    return bboxOption;
  }
}
