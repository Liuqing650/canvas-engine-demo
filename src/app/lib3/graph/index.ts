import { Canvas } from '../core/canvas';
import { GraphBase } from './base';
import { Node } from '../modules/node';
import { Item } from '../modules/item';
import { GraphData, GraphOption, NodeOption, GPlugin } from '../interface';
import { EventController } from '../core/event';
import { throttleArray } from '../utils';
import { DragNode, CanvasMove } from '../plugins';
import '../shapes/node';

const LEFT_BUTTON = 1;
export class Graph extends GraphBase {
  public canvas: Canvas;
  public activeCanvas: Canvas;

  public nodes: Node[] = [];
  public activeNodes: Node[] = [];
  public highRender = true;

  private mouseDown: { x: number; y: number };
  private moveInShape: { type: string; item: Node };
  private draggingShape: { type: string; item: Node };
  private dragging: boolean;

  constructor(option: GraphOption) {
    super(option);
  }

  public getDefaultOption(): GraphOption {
    return {
      container: null,
      width: 500,
      height: 500,
      plugins: [
        new DragNode(),
        new CanvasMove(),
      ],
    };
  }

  public initEvent() {
    const self = this;
    const eventController = new EventController({
      element: this.get('behaviorLayer'),
      graph: self,
    });
    this.set('eventController', eventController);
  }

  public initPlugins() {
    const plugins: GPlugin[] = this.get('plugins');
    if (!plugins || plugins.length === 0) {
      return null;
    }
    const graph = this;
    for (let idx = 0; idx < plugins.length; idx++) {
      const plugin = plugins[idx];
      plugin.invoke(graph);
    }
  }

  public addPlugin(plugin: GPlugin): void {
    if (!plugin) {
      return null;
    }
    let plugins: GPlugin[] = this.get('plugins');
    if (!plugins || plugins.length === 0) {
      plugins = [];
    }
    const graph = this;
    plugin.invoke(graph);
    plugins.push(plugin);
  }

  public removePlugin(plugin: GPlugin): void {
    const plugins = this.get('plugins');
    const index = plugins.indexOf(plugin);
    if (index >= 0) {
      plugin.destroy();
      plugins.splice(index, 1);
    }
  }

  public subscript() {
    this.on('mousedown', this.onMouseDown);
    this.on('mousemove', this.onMouseMove);
    this.on('mouseup', this.onMouseUp);
  }

  public onMouseDown({ event }) {
    this.resetMouseRecord();
    if (event.button !== 0) {
      return;
    }
    this.mouseDown = {x: event.offsetX, y: event.offsetY};
    const shape = this.checkMouseShape<Node>(this.nodes, 'node');
    if (shape) {
      this.moveInShape = shape;
      this.setActiveShape(shape);
      if (this.highRender) {
        this.refreshActiveShape();
      }
      this.emit(`mousedown:${shape.type}`, {event, item: shape.item});
    }
  }

  public onMouseMove({ event }) {
    if (!this.mouseDown || event.buttons !== LEFT_BUTTON) {
      return;
    }
    if (this.dragging) {
      if (this.draggingShape) {
        const { type, item } = this.draggingShape;
        this.emit(`${type}:drag`, {event, item, ...this.mouseDown});
      } else {
        this.emit('canvas:drag', {event});
      }
    } else if (this.mouseDown) {
      this.dragging = true;
      if (this.moveInShape) {
        this.draggingShape = this.moveInShape;
        const { type, item } = this.draggingShape;
        this.emit(`${type}:dragstart`, {event, item, ...this.mouseDown});
      } else {
        this.emit('canvas:dragstart', {event, ...this.mouseDown});
      }
    }
  }

  public onMouseUp({ event }) {
    if (!this.moveInShape) {
      return;
    }
    if (this.mouseDown && event.button === LEFT_BUTTON) {
      const moveInShape = this.moveInShape;
      if (this.dragging) {
        if (moveInShape) {
          const draggingShape = this.draggingShape;
          if (draggingShape) {
            const { type, item } = draggingShape;
            this.emit(`${type}:drop`, {event, item, ...this.mouseDown});
          }
          this.emit(`${moveInShape.type}:dragend`, {event, item: moveInShape.item, ...this.mouseDown});
        } else {
          this.emit('canvas:dragend', {event, ...this.mouseDown});
        }
        this.draggingShape = undefined;
        this.dragging = false;
      } else {
        if (moveInShape) {
          this.emit(`${moveInShape.type}:mouseup`, {event, item: moveInShape.item, ...this.mouseDown});
          this.moveInShape = undefined;
        } else {
          this.emit('canvas:mouseup', {event, ...this.mouseDown});
        }
      }
    }
    this.mouseDown = undefined;
  }

  public checkMouseShape<N>(items: N[], itemType: string) {
    const { x, y } = this.mouseDown;
    function eachHit<T>(data: T[], type: string) {
      for (let index = data.length - 1; index >= 0; index--) {
        const item: T = data[index];
        if (item && (item as any).hit(x, y)) {
          return {type, item} as { type: string; item: T; };
        }
      }
      return null;
    }
    const hitNode = eachHit<N>(items, itemType);
    if (hitNode) { return hitNode; }
    return null;
  }

  /**
   * 设置激活形状
   * @param { type: string; item: Node } activeShape 激活的形状
   * @description 将基于激活的项进行分类到 active{Shape} 中
   */
  public setActiveShape(activeShape: { type: string; item: Node }) {
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
    this.draw(this.activeNodes, this.activeCanvas);
    setTimeout(() => {
      this.render();
    }, 0);
  }

  public getNodes(): Node[] {
    return this.nodes;
  }

  public read(data: GraphData, isThrottle?: boolean) {
    this.clear();
    if (data.nodes && data.nodes.length) {
      const nodes = data.nodes || [];
      for (let idx = 0; idx < nodes.length; idx++) {
        const nodeOption: NodeOption = nodes[idx];
        const node = new Node(nodeOption);
        this.nodes.push(node);
      }
    }
    this.render(isThrottle);
  }

  public render(isThrottle?: boolean) {
    this.renderShpae(this.nodes, isThrottle);
  }

  private renderShpae(nodes: Node[], isThrottle?: boolean) {
    if (!nodes || nodes.length === 0) {
      return null;
    }
    this.canvas.clearCanvas();
    const ctx = this.canvas.ctx;
    if (isThrottle) {
      // 节流渲染
      throttleArray(this.nodes, (node: Node) => {
        if (node && node.isShow()) {
          node.draw(ctx);
        }
      }, 60, 10);
    } else {
      // 直接渲染
      for (let i = 0; i < nodes.length; i++) {
        const node = nodes[i];
        if (node && node.isShow()) {
          node.draw(ctx);
        }
      }
    }
  }

  public refresh() {
    this.draw(this.nodes, this.canvas);
  }

  public drawActive() {
    this.draw(this.activeNodes, this.activeCanvas);
  }

  public draw(nodes: Item[], canvas: Canvas) {
    const ctx = canvas.ctx;
    canvas.clearCanvas();
    if (!nodes || nodes.length === 0) {
      return null;
    }
    nodes.forEach((node: Item) => {
      node.draw(ctx);
    });
  }

  public startHighRender(open?: boolean) {
    this.highRender = !!open;
    this.refresh();
  }

  public resetMouseRecord() {
    this.mouseDown = undefined;
    this.moveInShape = undefined;
    this.draggingShape = undefined;
    this.dragging = false;
  }

  public resetActiveShape() {
    this.activeNodes = [];
    if (this.activeCanvas) {
      this.activeCanvas.clearCanvas();
    }
  }

  public clear() {
    this.nodes = [];
    if (this.canvas) {
      this.canvas.clearCanvas();
    }
    this.resetActiveShape();
  }

}
