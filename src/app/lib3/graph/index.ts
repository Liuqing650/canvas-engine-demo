import { Canvas } from '../core/canvas';
import { Container } from '../core/container';
import { Node } from '../modules/node';
import { GraphData, GraphOption, NodeOption } from '../interface';
import '../shapes/node';
import { EventController } from '../core/event';
import { throttleArray } from '../utils';

const LEFT_BUTTON = 0;
export class Graph extends Container {
  public canvas: Canvas;
  public activeCanvas: Canvas;

  public nodes: Node[] = [];
  public activeNodes: Node[] = [];

  private mouseDown: { x: number; y: number };
  public draggableBox: {x: number, y: number};
  private moveInShape: { type: string; item: Node };
  private draggingShape: { type: string; item: Node };
  private dragging: boolean;

  constructor(option: GraphOption) {
    super(option);
    this.initGraph();
  }

  private initGraph() {
    this.initGraphContainer();
    this.initEvent();
    this.subscript();
  }

  private initGraphContainer() {
    const size = this.getSize();
    const container = this.get('container');
    const behaviorLayer = this.createDivElement();
    this.canvas = new Canvas({ ...size, container });
    this.activeCanvas = new Canvas({ ...size, container });
    this.appendElement(behaviorLayer);
    this.set('behaviorLayer', behaviorLayer);
  }

  private initEvent() {
    const self = this;
    const eventController = new EventController({
      element: this.get('behaviorLayer'),
      graph: self,
    });
    this.set('eventController', eventController);
  }

  public subscript() {
    this.on('mousedown', this.onMouseDown);
    this.on('mousemove', this.onMouseMove);
    this.on('mouseup', this.onMouseUp);
    this.on('node:dragstart', this.onShapeDragStart);
    this.on('node:drag', this.onShapeDrag);
    this.on('node:drop', this.onShapeDrop);
  }

  public onMouseDown({ event }) {
    if (event.button !== 0) {
      return;
    }
    this.mouseDown = {x: event.offsetX, y: event.offsetY};
    const shape = this.checkMouseShape();
    if (shape) {
      this.setActiveShape(shape);
      this.refreshActiveShape();
      this.emit(`mousedown:${shape.type}`, {event, item: shape.item});
    }
  }

  public onMouseMove({ event }) {
    if (this.mouseDown && event.buttons !== 1) {
      this.onMouseDown({ event });
      return;
    }
    if (this.dragging) {
      if (this.draggingShape) {
        const { type, item } = this.draggingShape;
        this.emit(`${type}:drag`, {event, item});
      } else {
        this.emit('drag', {event});
      }
    } else if (this.mouseDown) {
      this.dragging = true;
      if (this.moveInShape) {
        this.draggingShape = this.moveInShape;
        const { type, item } = this.draggingShape;
        this.emit(`${type}:dragstart`, {event, item});
      }
      this.emit('dragstart', {event});
    }
  }

  public onMouseUp({ event }) {
    if (this.mouseDown && event.button === LEFT_BUTTON) {
      const moveInShape = this.moveInShape;
      if (this.dragging) {
        const draggingShape = this.draggingShape;
        if (draggingShape) {
          const { type, item } = draggingShape;
          this.emit(`${type}:drop`, {event, item});
        }
        this.emit(`${moveInShape.type}:dragend`, {event, item: moveInShape.item});
        this.draggingShape = undefined;
        this.dragging = false;
      } else {
        if (moveInShape) {
          this.emit(`${moveInShape.type}:mouseup`, {event, item: moveInShape.item});
          this.moveInShape = undefined;
        }
      }
    }
    this.mouseDown = undefined;
  }

  /** 图形拖拽 */
  public onShapeDragStart({ event, item }: {event: MouseEvent; item: Node}) {
    const bbox = item.getBBox();
    this.draggableBox = {x: bbox.x, y: bbox.y};
  }
  /** 图形拖拽中 */
  public onShapeDrag({ event, item }: {event: MouseEvent; item: Node}) {
    const movex = (event.offsetX - this.mouseDown.x) << 0;
    const movey = (event.offsetY - this.mouseDown.y) << 0;
    const { x, y } = this.draggableBox;
    item.updatePosition(x + movex, y + movey);
    // this.localRefresh(this.activeNodes);
    // this.refresh(this.nodes);
    this.draw(this.activeNodes, this.activeCanvas);
  }
  /** 图形拖拽完 */
  public onShapeDrop({ event, item }) {
    this.activeNodes.forEach((node: Node) => {
      node.show();
    });
    this.activeNodes = [];
    this.draw(this.activeNodes, this.activeCanvas);
    this.render(this.nodes);
  }

  public checkMouseShape() {
    const { x, y } = this.mouseDown;
    function eachHit<T>(data: T[], type: string) {
      for (let index = data.length; index > 0; index--) {
        const item: T = data[index];
        if (item && (item as any).hit(x, y)) {
          return {type, item} as { type: string; item: T; };
        }
      }
      return null;
    }
    const hitNode = eachHit<Node>(this.nodes, 'node');
    if (hitNode) { return hitNode; }
    return null;
  }

  public packHitShape<T>(shape: T, type: string): { type: string; shape: T; } {
    return {type, shape};
  }

  public changeSize(width: number, height: number) {
    const size = this.getSize();
    this.set('width', width || size.width);
    this.set('height', height || size.height);
  }

  /**
   * 设置激活形状
   * @param { type: string; item: Node } activeShape 激活的形状
   * @description 将基于激活的项进行分类到 active{Shape} 中
   */
  public setActiveShape(activeShape: { type: string; item: Node }) {
    this.moveInShape = activeShape;
    const { type, item } = activeShape;
    this.activeNodes = [];
    switch (type) {
      case 'node':
        this.activeNodes.push(item);
        break;
    }
  }

  public refreshActiveShape() {
    const activeNodes = this.activeNodes || [];
    const activeIds = activeNodes.map((node: Node) => node.id);
    function eachActive<T>(data: T[], callback: (x: T, a: boolean) => void) {
      for (let index = 0; index < data.length; index++) {
        const item: T = data[index];
        const active = activeIds.includes((item as any).id);
        if (callback) { callback(item, active); }
      }
    }
    eachActive<Node>(this.nodes, (node: Node, active: boolean) => {
      if (active) {
        node.hide();
      } else {
        node.show();
      }
      node.setStatus('active', active);
    });
    this.render(this.nodes);
    this.draw(this.activeNodes, this.activeCanvas);
  }

  public resetGraphData() {
    this.activeNodes = [];
    this.nodes = [];
  }

  public read(data: GraphData, isThrottle?: boolean) {
    this.resetGraphData();
    if (data.nodes && data.nodes.length) {
      const nodes = data.nodes || [];
      for (let idx = 0; idx < nodes.length; idx++) {
        const nodeOption: NodeOption = nodes[idx];
        const node = new Node(nodeOption);
        this.nodes.push(node);
      }
    }
    this.render(this.nodes, isThrottle);
  }

  public render(nodes: Node[], isThrottle?: boolean) {
    if (!nodes || nodes.length === 0) {
      return null;
    }
    this.canvas.clearCanvas();
    const ctx = this.canvas.ctx;
    if (isThrottle) {
      // 节流渲染
      throttleArray(this.nodes, (node: Node) => {
        node.draw(ctx);
      }, 60, 10);
    } else {
      // 直接渲染
      for (let i = 0; i < nodes.length; i++) {
        const node = nodes[i];
        if (node.isShow()) {
          node.draw(ctx);
        }
      }
    }
  }

  public refresh(nodes: Node[]) {
    if (!nodes || nodes.length === 0) {
      return null;
    }
    this.canvas.clearCanvas();
    const ctx = this.canvas.ctx;
    nodes.forEach((node: Node) => {
      node.draw(ctx);
    });
  }

  public draw(nodes: Node[], canvas: Canvas) {
    const ctx = canvas.ctx;
    canvas.clearCanvas();
    if (!nodes || nodes.length === 0) {
      return null;
    }
    nodes.forEach((node: Node) => {
      node.draw(ctx);
    });
  }

}
