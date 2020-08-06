import store from './store';
import globalServer from './global';
import { ShapeOption } from '../interface';

export const GService = {
  getId: () => globalServer.getId(),
  getNodeId: () => globalServer.getNodeId(),
  setShape: (name: string, shapeOption: ShapeOption, extendShape?: string) => store.setShape(name, shapeOption, extendShape),
  getShape: (name: string): ShapeOption => store.getShape(name),
  getAllShape: (): {[key: string]: ShapeOption} => store.getAllShape(),
};
