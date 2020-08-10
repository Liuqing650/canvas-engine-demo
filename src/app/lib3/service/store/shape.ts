import { ShapeOption } from '../../shapes/interface';

interface Shapes {
  [type: string]: {
    [key: string]: ShapeOption
  }
}

class ShapeStore {
  public shapes: Shapes = {};

  public addShape(type: string, name: string, shapeOption: ShapeOption, extendShapeName?: string) {
    const extendShape = extendShapeName ? this.getShape(type, extendShapeName) : null;
    shapeOption.name = name;
    if (!this.shapes[type]) {
      this.shapes[type] = {};
    }
    if (extendShape) {
      const shape = Object.assign({}, extendShape, shapeOption);
      this.shapes[type][name] = shape;
    } else {
      this.shapes[type][name] = shapeOption;
    }
  }

  getShape(type: string, name: string): ShapeOption {
    if (!this.shapes[type]) {
      return undefined;
    }
    return this.shapes[type][name];
  }

  get(key: string) {
    return this[key];
  }
}

export default new ShapeStore();
