import { getPixelRatio, throttleArray } from '../../util/util';
import { AbstractCanvas } from '../abstract';
import { NodeConfig } from '../../interface';
import { Node } from '../../shape/nodes';
import { Point } from '../../shape/point';
import { EventController } from '../event';

export class Canvas extends AbstractCanvas {

  public nodes: Node[] = [];

  // 预渲染的节点,将会在鼠标谈起时触发
  public preparNode: NodeConfig;

  // 拖拽的节点
  public mouseDown: {x: number, y: number};
  public draggableBox: {x: number, y: number};
  private scheduledAnimationFrame = false;
  private rendering = false;

  getDefaultCfg() {
    const cfg = super.getDefaultCfg();
    return cfg;
  }

  initEvents() {
    const eventController = new EventController(this);
    this.set('eventController', eventController);
    // 如果有拖拽后携带有数据,考虑创建一个新节点
    this.on('drop', ({event}) => {
      // 处理预渲染node, 放在emit后面,可以交给用户提前决定是否有效处理预渲染节点
      if (this.preparNode) {
        this.handlePreparNode(event);
      }
    });
    this.on('node:dragstart', ({event, shape}) => {
      if (!shape) {
        return;
      }
      const model: NodeConfig = shape.getModel() as NodeConfig;
      this.mouseDown = {x: event.offsetX, y: event.offsetY};
      this.draggableBox = {x: model.x, y: model.y};
      this.handleDragNode(event, shape);
    });
    this.on('node:drag', ({event, shape}) => {
      this.handleDragNode(event, shape);
    });
  }

  // 实现 创建dom元素 的抽象函数
  createDom(): HTMLElement {
    const element = document.createElement('canvas');
    element.style.position = 'absolute';
    element.style.left = '0';
    element.style.top = '0';
    element.style.outline = 'none';
    const context = element.getContext('2d');

    // 缓存 context 对象
    this.set('context', context);
    return element;
  }

  // 复写dom元素的大小
  setDOMSize(width: number, height: number) {
    super.setDOMSize(width, height);
    const context = this.get('context');
    const el = this.get('el');
    const pixelRatio = this.getPixelRatio();
    el.width = pixelRatio * width;
    el.height = pixelRatio * height;
    // 设置 canvas 元素的宽度和高度，会重置缩放，因此 context.scale 需要在每次设置宽、高后调用
    if (pixelRatio > 1) {
      context.scale(pixelRatio, pixelRatio);
    }
  }
  /**
   * 获取屏幕像素比
   */
  getPixelRatio() {
    const pixelRatio = this.get('pixelRatio') || getPixelRatio();
    // 不足 1 的取 1，超出 1 的取整
    return pixelRatio >= 1 ? Math.floor(pixelRatio) : 1;
  }

  getContext(): CanvasRenderingContext2D {
    return this.get('context');
  }

  addItem(nodeConfig: NodeConfig): Node {
    const node = new Node(nodeConfig);
    this.nodes.push(node);

    // 添加完成之后直接绘制节点
    const context = this.get('context');
    node.draw(context);
    this.emit('addItem', node);
    return node;
  }

  /**
   * 读取图形数据
   * @param data NodeConfig[]
   * @param isThrottle boolean 是否进行节流渲染
   */
  read(data: NodeConfig[], isThrottle?: boolean): boolean {

    this.clear();

    if (!data || data.length === 0) {
      console.warn('没有任何节点渲染');
      return false;
    }

    // 实例化节点
    for (let i = 0; i < data.length; i++) {
      const nodeConfig: NodeConfig = data[i];
      const node = new Node(nodeConfig);
      this.nodes.push(node);
    }

    // 绘制节点
    const context = this.get('context');

    if (isThrottle) {
      // 节流渲染
      throttleArray(this.nodes, (node: Node) => {
        node.draw(context);
      }, 60, 10);
    } else {
      // 直接渲染
      for (let i = 0; i < this.nodes.length; i++) {
        const node = this.nodes[i];
        node.draw(context);
      }
    }
    return true;
  }

  /** 这两个函数负责拖拽添加元素到画布上 */
  addPreparNode(nodeConfig: any) {
    this.preparNode = nodeConfig;
  }

  handlePreparNode(event: MouseEvent) {
    if (!this.preparNode) {
      return false;
    }

    // 获取一个整数位置,进行放置,避免出现一堆小数,影响计算
    this.preparNode.x = (event.offsetX - this.preparNode.width / 2) << 0;
    this.preparNode.y = (event.offsetY - this.preparNode.height / 2) << 0;

    this.emit('additem:before', {event, model: this.preparNode});
    const node = this.addItem(this.preparNode);
    this.emit('additem:end', {event, item: node});
    // 添加完成,清除预渲染node
    this.preparNode = undefined;
  }

  /** 这里获取鼠标当前位置的图形,可能是某个节点,也可能是画布区域 */
  getShape(event: MouseEvent) {
    const point = new Point(event.offsetX, event.offsetY);
    const inNode = this.inNodes(point, this.nodes);
    return inNode;
  }

  // canvas绘制分层级,具有先后顺序,所以倒序才是从最顶层开始
  inNodes(pt: Point, nodes: Node[]) {
    for (let i = nodes.length - 1; i > -1; --i) {
      const node = this.inNode(pt, nodes[i]);
      if (node) {
        return node;
      }
    }
    return null;
  }
  // 检测是否碰到该区域
  inNode(pt: Point, node: Node): Node {
    if (node.hit(pt.x, pt.y)) {
      return node;
    }
    return null;
  }

  /** 拖拽节点相关事情 */
  handleDragNode(event: MouseEvent, shape: Node) {
    if (this.scheduledAnimationFrame || !this.mouseDown) {
      return null;
    }
    this.scheduledAnimationFrame = true;
    const pos = new Point(event.offsetX, event.offsetY);
    requestAnimationFrame(() => {
      const move = {
        x: pos.x - this.mouseDown.x,
        y: pos.y - this.mouseDown.y,
      };
      const model: NodeConfig = shape.getModel() as NodeConfig;
      model.x = this.draggableBox.x + move.x;
      model.y = this.draggableBox.y + move.y;
      this.updateItem(model);
      this.render();
      this.scheduledAnimationFrame = false;
    });
  }

  updateItem(nodeConfig: NodeConfig) {
    const id = nodeConfig.id;
    for (let idx = 0; idx < this.nodes.length; idx++) {
      if (this.nodes[idx].id === id) {
        this.nodes[idx].update(nodeConfig);
        return this.nodes[idx];
      }
    }
  }

  /** 通过鼠标事件计算当前形状的位置 */
  cacluteShapePositionByMouseEvent(event: MouseEvent, shape: Node) {
    const model: NodeConfig = shape.getModel() as NodeConfig;
    const moveX = (event.offsetX - model.x) << 0;
    const moveY = (event.offsetY - model.y) << 0;
    return {moveX, moveY};
  }

  render() {
    if (this.rendering) {
      return this;
    }
    this.clearCanvas();
    this.rendering = true;
    const context = this.get('context');
    for (let idx = 0; idx < this.nodes.length; idx++) {
      this.nodes[idx].draw(context);
    }
    this.rendering = false;
  }
  clearCanvas() {
    const context = this.get('context');
    const element = this.get('el');
    context.clearRect(0, 0, element.width, element.height);
  }

  destroyEvent() {
    const eventController = this.get('eventController');
    eventController.destroy();
  }

  // 复写基类方法
  clear() {
    super.clear();
    this.clearCanvas();
    this.nodes = [];
  }

  destroy() {
    super.destroy();
    this.clear();
    this.destroyEvent();
    this.nodes = [];
  }
}
