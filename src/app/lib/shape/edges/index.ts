import { EdgeConfig, ItemType, ShapeOption, AnchorPoint } from '../../interface';
import { Item } from '../item';
import { GService } from '../../service';
import './shape';
import { BBox } from '../bbox';
import { Canvas } from '../../core/canvas';
import { Node } from '../nodes';

// 默认形状
const DEFAULT_SHAPE = 'line';

export class Edge extends Item {

  /** 节点id */
  public id: string;

  public type: ItemType = 'edge';

  public shapeName: string;

  public model: EdgeConfig;

  public canvas: Canvas;

  public source: string;

  public target: string;

  public sourceAnchorIndex: number;

  public targetAnchorIndex: number;

  constructor(cfg: EdgeConfig, canvas: Canvas) {
    super(cfg);

    this.canvas = canvas;
    // 初始化配置
    this.initConfig(cfg);
  }

  private initConfig(model: EdgeConfig) {

    // 如果用户没有设定id，就在这里构建一个id
    this.id = model.id || GService.getNodeId();
    model.id = this.id;

    // 初始化节点的形状
    this.shapeName = model.shapeName || DEFAULT_SHAPE;
    model.shapeName = this.shapeName;

    this.model = model;

    this.source = model.source;
    this.target = model.target;

    this.sourceAnchorIndex = model.sourceAnchorIndex;
    this.targetAnchorIndex = model.targetAnchorIndex;

    model.sourceNode = this.getSourceNode();
    model.targetNode = this.getTargetNode();
  }

  public update(model: EdgeConfig) {
    this.model = {...this.model, ...model};
  }

  public draw(ctx: CanvasRenderingContext2D): void {

    // 更新盒子大小
    this.getAttr();
    this.updateAnchorPoistion();
    // 绘制
    const shape: ShapeOption = GService.getShape(this.shapeName);
    shape.options = this.getShapeModelOption();
    shape.draw(ctx, this);
  }

  public getAttr() {
    super.getAttr();
    return this.attr;
  }

  private getSourceNode(): Node {
    if (!this.source) {
      return null;
    }
    const nodes: Node[] = this.canvas.nodes || [];
    for (let idx = 0; idx < nodes.length; idx++) {
      if (nodes[idx].id === this.source) {
        return nodes[idx];
      }
    }
  }

  private getTargetNode(): Node {
    if (!this.target) {
      return null;
    }
    const nodes: Node[] = this.canvas.nodes || [];
    for (let idx = 0; idx < nodes.length; idx++) {
      if (nodes[idx].id === this.target) {
        return nodes[idx];
      }
    }
  }

  public getSource(): Node {
    return this.model.sourceNode;
  }

  public getTarget(): Node {
    return this.model.targetNode;
  }

  public updateAnchorPoistion() {

    const source = this.getSource();
    const target = this.getTarget();

    const sourceAnchorPoint: AnchorPoint = source.cacluteAnchorPosition(false, this.sourceAnchorIndex) as AnchorPoint;
    const targetAnchorPoint: AnchorPoint = target ? target.cacluteAnchorPosition(false, this.targetAnchorIndex) as AnchorPoint : null;

    this.model.sourcePoint = sourceAnchorPoint;
    this.model.targetPoint = targetAnchorPoint;
  }

  public getEdgeBBox() {
    const model: EdgeConfig = this.model;
    const source = model.sourcePoint;
    const target = model.targetPoint;
    return {
      source: {
        x: source.x || 0,
        y: source.y || 0,
        anchorIndex: source.anchorIndex || 0,
      },
      target: {
        x: target.x || 0,
        y: target.y || 50,
        anchorIndex: target.anchorIndex || 0,
      },
    };
  }
}
