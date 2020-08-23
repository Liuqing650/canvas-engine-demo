import { Graph } from './graph';
import { Shape } from './shapes';

export * from './interface';

const registerNode = Shape.registerNode;
const registerEdge = Shape.registerEdge;

export {
  Graph,
  registerNode,
  registerEdge,
};

export default {
  Graph,
  registerNode,
  registerEdge,
};
