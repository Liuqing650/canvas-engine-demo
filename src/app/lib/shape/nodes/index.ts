import { NodeConfig, ItemType, ShapeOption, AnchorPoint, BBoxConfig } from '../../interface';
import { Item } from '../item';
import { GService } from '../../service';
import { BBox } from '../bbox';
import './shape';

// 默认形状
const DEFAULT_SHAPE = 'rect';

export class Node extends Item {

  /** 节点id */
  public id: string;

  public type: ItemType = 'node';

  public shapeName: string;

  public model: NodeConfig;

  public anchors: AnchorPoint[] = [];

  public anchorIndex: number;

  public anchorShapes: BBox[] = [];

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
    this.anchors = this.getAuthorPoint();
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
    // 绘制锚点
    this.drawAnchor(ctx);
  }

  public getAttr() {
    super.getAttr();
    this.attr.width = this.model.width || 100;
    this.attr.height = this.model.height || 60;
    return this.attr;
  }

  public getAuthorPoint(): AnchorPoint[] {
    const model = this.model;
    const anchor = model.anchor;
    const defaultAnthor = this.cacluteAnchorPosition(true) as AnchorPoint[];
    if (typeof anchor === 'boolean' && anchor) {
      return defaultAnthor || [];
    }
    return anchor as AnchorPoint[] || [];
  }

  public cacluteAnchorPosition(all: boolean, anchorIndex?: number): AnchorPoint[] | AnchorPoint {
    const bbox = this.bbox;
    const leftCenter: AnchorPoint = {
      x: bbox.minX,
      y: (bbox.minY + bbox.maxY) / 2,
      anchorIndex: 0,
    };
    const topCenter: AnchorPoint = {
      x: (bbox.minX + bbox.maxX) / 2,
      y: bbox.minY,
      anchorIndex: 1,
    };
    const rightCenter: AnchorPoint = {
      x: bbox.maxX,
      y: (bbox.minY + bbox.maxY) / 2,
      anchorIndex: 2,
    };
    const bottomCenter: AnchorPoint = {
      x: (bbox.minX + bbox.maxX) / 2,
      y: bbox.maxY,
      anchorIndex: 3,
    };
    const output: AnchorPoint[] = [leftCenter, topCenter, rightCenter, bottomCenter];
    if (all) {
      return output;
    }
    return output[anchorIndex];
  }

  public hitAnchor(x: number, y: number, padding?: number): BBox {
    const shapes = this.anchorShapes || [];
    if (shapes && shapes.length === 0) {
      return undefined;
    }
    for (let idx = 0; idx < shapes.length; idx++) {
      const bbox: BBox = shapes[idx];
      if (bbox.hit(x, y, padding)) {
        return bbox;
      }
    }
  }

  public drawAnchor(ctx: CanvasRenderingContext2D) {
    const { anchorStyle } = this.getShapeModelOption();
    const anchorPoint: AnchorPoint[] = this.getAuthorPoint();
    // 锚点半径
    const radius = anchorStyle.radius || 5;
    this.anchorShapes = [];
    if (anchorPoint && anchorPoint.length > 0) {
      for (let index = 0; index < anchorPoint.length; index++) {
        const anchor = anchorPoint[index];
        ctx.save();
        ctx.beginPath();
        ctx.translate(anchor.x, anchor.y);
        ctx.arc(0, 0, radius, 0, Math.PI * 2, false);
        this.setAttr(ctx, anchorStyle || {});
        ctx.fill();
        ctx.stroke();
        ctx.restore();
        this.addAnchor(anchor, radius, 10);
      }
    }
  }

  public addAnchor(anchor: AnchorPoint, radius: number, zIndex?: number) {
    const config: BBoxConfig = {
      x: anchor.x - radius,
      y: anchor.y - radius,
      width: 2 * radius,
      height: 2 * radius,
      name: `anchor-${anchor.anchorIndex}`,
      zIndex: zIndex || 10,
      anchorIndex: anchor.anchorIndex,
    };
    const bbox = this.generateBBox(config);
    this.anchorShapes.push(bbox);
  }
}
