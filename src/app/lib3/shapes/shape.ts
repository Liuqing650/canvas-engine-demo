import { shapeStore } from '../service/store';
import { ShapeOption } from '../interface';

export class Shape {
  // 注册节点
  public static registerNode(name: string, shapeOption: ShapeOption, extendShapeName?: string) {
    shapeStore.addShape('node', name, shapeOption, extendShapeName);
  }
  // 注册边
  public static registerEdge(name: string, shapeOption: ShapeOption, extendShapeName?: string) {
    shapeStore.addShape('edge', name, shapeOption, extendShapeName);
  }
  public static getShape(type: string, name: string): ShapeOption {
    return shapeStore.getShape(type, name);
  }
}
