import { Canvas } from '../core/canvas';
import { Container } from '../core/container';
import { Node } from '../modules/node';
import { GraphData, GraphOption, NodeOption } from '../interface';
import '../shapes/node';
import { EventController } from '../core/event';

export class Graph extends Container {
  public canvas: Canvas;

  public nodes: Node[] = [];
  public activeNodes: Node[] = [];

  private mouseDown: { x: number; y: number };
  private moveInShape: { type: string; shape: Node };

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
    this.canvas = new Canvas({ ...size, container });
  }

  private initEvent() {
    const self = this;
    const eventController = new EventController({
      canvas: self.canvas,
      graph: self,
    });
    this.set('eventController', eventController);
  }

  public subscript() {
    this.on('mousedown', this.onMouseDown);
    this.on('mousemove', this.onMouseMove);
    this.on('mouseup', this.onMouseUp);
  }

  public onMouseDown({ event }) {
    if (event.button !== 0) {
      return;
    }
    const canvasPos = this.canvas.canvasElement.getBoundingClientRect() as DOMRect;
    this.mouseDown = { x: event.x - canvasPos.x, y: event.y - canvasPos.y };
    const shape = this.checkMouseShape();
    if (shape) {
      this.setActiveShape(shape);
      this.emit(`mousedown:${shape.type}`, {event, shape: shape.shape});
    }
  }

  public onMouseMove({ event }) {
    if (this.mouseDown && event.buttons !== 1) {
      this.onMouseDown({ event });
      return;
    }
    // console.log('mousemove----->', event);
  }

  public onMouseUp({ event }) {
    console.log('mouseup----->', event);
    this.mouseDown = undefined;
  }

  public checkMouseShape() {
    const { x, y } = this.mouseDown;
    for (let index = 0; index < this.nodes.length; index++) {
      const node: Node = this.nodes[index];
      if (node && node.hit(x, y)) {
        return this.packHitShape<Node>(node, 'node');
      }
    }
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

  public setActiveShape(activeShape: { type: string; shape: Node }) {
    this.moveInShape = activeShape;
    const { type, shape } = activeShape;
    this.activeNodes = [];
    switch (type) {
      case 'node':
        this.activeNodes.push(shape);
        break;
    }
  }

  public resetGraphData() {
    this.activeNodes = [];
    this.nodes = [];
  }

  public read(data: GraphData) {
    this.resetGraphData();
    if (data.nodes && data.nodes.length) {
      const nodes = data.nodes || [];
      for (let idx = 0; idx < nodes.length; idx++) {
        const nodeOption: NodeOption = nodes[idx];
        const node = new Node(nodeOption);
        this.nodes.push(node);
      }
    }
    this.render(this.nodes);
  }

  public render(nodes: Node[]) {
    if (!nodes || nodes.length === 0) {
      return null;
    }
    this.canvas.clearCanvas();
    const ctx = this.canvas.ctx;
    nodes.forEach((node: Node) => {
      node.draw(ctx);
    });
  }

  public draw(nodes: Node[]) {
    if (!nodes || nodes.length === 0) {
      return null;
    }
    const ctx = this.canvas.ctx;
    nodes.forEach((node: Node) => {
      node.draw(ctx);
    });
  }
}
