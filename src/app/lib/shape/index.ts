import { ShapeOption } from '../interface';
import { GService } from '../service';

// 对形状做出一些完善和处理
export class Shape {
  // 注册节点
  public static registeNode(name: string, shapeOption: ShapeOption, extendShape?: string) {
    GService.setShape(name, shapeOption, extendShape);
  }
  // 注册边
  public static registeEdge(name: string, shapeOption: ShapeOption, extendShape?: string) {
    GService.setShape(name, shapeOption, extendShape);
  }
  // 获取边
  public static getShape(name?: string) {
    return GService.getShape(name);
  }
}

