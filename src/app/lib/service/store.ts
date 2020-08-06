import { ShapeOption } from '../interface';

// 存储所有
class Store {
  public shape: {[key: string]: ShapeOption} = {};

  /**
   * 插入形状配置
   * @param name 形状名称
   * @param shapeOption 形状配置
   * @param extendShapeName 继承类型名称
   */
  public setShape(name: string, shapeOption: ShapeOption, extendShapeName?: string) {
    const extendShape = extendShapeName ? this.getShape(extendShapeName) : null;
    shapeOption.shapeType = name;
    if (extendShape) {
      const shapeObj = Object.assign({}, extendShape, shapeOption);
      this.shape[name] = shapeObj;
    } else {
      this.shape[name] = shapeOption;
    }
  }
  public getShape(name: string): ShapeOption {
    return this.shape[name];
  }
  public getAllShape(): {[key: string]: ShapeOption} {
    return this.shape;
  }
}

export default new Store();
