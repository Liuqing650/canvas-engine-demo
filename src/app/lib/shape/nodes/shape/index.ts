// 注册自定义节点

import { Shape } from '../../../shape';

import { baseShape } from './base';
import { rectShape } from './rect';
import { circleShape } from './circle';

// 所有图形的起点
Shape.registeNode('base-node', baseShape);

// 真正的图形
Shape.registeNode('rect', rectShape, 'base-node');
Shape.registeNode('circle', circleShape, 'base-node');
