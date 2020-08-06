import { NodeConfig, ItemType, ShapeOption } from '../../interface';
import { Item } from '../item';
import { GService } from '../../service';
import './shape';

// 默认形状
const DEFAULT_SHAPE = 'rect';

export class Node extends Item {

  /** 节点id */
  public id: string;

  public type: ItemType = 'node';

  public shapeName: string;

  public model: NodeConfig;

  constructor(cfg: NodeConfig) {
    super(cfg);

    // 初始化配置
    this.initConfig(cfg);
  }

  private initConfig(model: NodeConfig) {

    // 如果用户没有设定id，就在这里构建一个id
    this.id = model.id || GService.getNodeId();
    model.id = this.id;

    // 初始化节点的形状
    this.shapeName = model.shapeName || DEFAULT_SHAPE;
    model.shapeName = this.shapeName;

    this.model = model;
  }

  public update(model: NodeConfig) {
    this.model = {...this.model, ...model};
  }

  public draw(ctx: CanvasRenderingContext2D): void {

    // 更新盒子大小
    this.bbox.update(this.model);
    this.getAttr();
    // 绘制
    const shape: ShapeOption = GService.getShape(this.shapeName);
    shape.options = this.getShapeModelOption();
    shape.draw(ctx, this);
  }

  public getAttr() {
    super.getAttr();
    this.attr.width = this.model.width || 100;
    this.attr.height = this.model.height || 60;
    return this.attr;
  }
}
