import { ShapeOption } from "../interface";
import { Shape } from '../shape';

const baseNode: ShapeOption = {
  option: {},
  draw() {

  },
  update() {},
};

Shape.registerNode('base-node', baseNode);
