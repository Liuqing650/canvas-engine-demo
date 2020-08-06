import { ShapeOption } from '../../shapes/interface';

class ShapeStore {
  public shapes: {[key: string]: ShapeOption};

  public addShape(name: string, shapeOption: ShapeOption, extendShapeName?: string) {
    const extendShape = extendShapeName ? this.getShape(extendShapeName) : null;
    shapeOption.name = name;
    if (extendShape) {
      const shape = Object.assign({}, extendShape, shapeOption);
      this.shapes[name] = shape;
    } else {
      this.shapes[name] = shapeOption;
    }
  }

  getShape(name: string): ShapeOption {
    return this.shapes[name];
  }

  get(key: string) {
    return this[key];
  }
}

export default new ShapeStore();
