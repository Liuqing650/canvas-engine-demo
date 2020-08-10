import { AbstractItem } from '../../core/abstract/item';
import { Shape } from '../../shapes';
import { ShapeOption } from '../../shapes/interface';

export class Item extends AbstractItem {
  
  public id: string;

  // 形状名称，与注册名称紧密相关，如 矩形、直线等
  public shapeName: string;

  // 形状类型，与图形分类紧密相关，如 节点、边等
  public shapeType: string;

  constructor(option: any) {
    super(option);
  }

  public draw(ctx: CanvasRenderingContext2D) {
    const shape = this.getShapeOption();
    shape.draw(ctx, {});
  }

  public getShapeOption(): ShapeOption {
    return Shape.getShape(this.shapeType, this.shapeName);
  }

  public bbox() {
  }
}