// 注册自定义节点

import { Shape } from '../../../shape';

import { baseShape } from './base';
import { lineShape } from './line';

// 所有图形的起点
Shape.registeEdge('base-edge', baseShape);

// 真正的图形
Shape.registeEdge('line', lineShape, 'base-edge');
