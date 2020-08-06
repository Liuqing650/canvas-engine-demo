import { ShapeOption } from './interface';
import { shapeStore } from '../service/store'

export class Shape {
  // 注册节点
  public static registerNode(name: string, shapeOption: ShapeOption, extendShapeName?: string) {
    shapeStore.addShape(name, shapeOption, extendShapeName);
  }
  // 注册边
  public static registerEdge(name: string, shapeOption: ShapeOption, extendShapeName?: string) {
    shapeStore.addShape(name, shapeOption, extendShapeName);
  }
  public static getShape(name: string) {
    return shapeStore.getShape(name);
  }
}