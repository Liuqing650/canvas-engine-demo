import { Canvas } from '../canvas';
import { Node } from '../../shape/nodes';

// 监听的事件
const EVENTS = [
  'mousedown',
  'mouseup',
  // 'dblclick',
  'mouseout',
  'mouseover',
  'mousemove',
  'mouseleave',
  'mouseenter',
  // 'touchstart',
  // 'touchmove',
  // 'touchend',
  'dragenter',
  'dragover',
  'dragleave',
  'drop',
  // 'contextmenu',
  'mousewheel',
];

const LEFT_BUTTON = 0;

export class EventController {

  private canvas: Canvas;
  // 正在被拖拽的图形
  private draggingShape: Node = null;
  private mousedownShape: Node = null;
  private dragging = false;
  private mousedown = false;

  constructor(canvas: Canvas) {
    this.canvas = canvas;
    this.init();
  }

  init() {
    const el = this.canvas.get('el');
    EVENTS.forEach((eventName: string) => {
      el.addEventListener(eventName, this.eventCallback);
    });
  }

  eventCallback = (event: any) => {
    const type = event.type;
    this.triggerEvent(type, event);
  }

  triggerEvent(eventName: string, event: any) {
    // 每一次事件都会获取当前可能碰到的图形
    const shape = this.canvas.getShape(event);
    if (eventName === 'dragover') {
      this.ondragover(event);
    } else {
      // 某些特殊事件需要单独处理
      switch (eventName) {
        case 'mousedown':
          this.onMouseDown(event, shape, eventName);
          break;
        case 'mousemove':
          this.onMouseMove(event, shape, eventName);
          break;
        case 'mouseup':
          this.onMouseUp(event, shape, eventName);
          break;
        default:
          this.canvas.emit(eventName, {event, canvas: this.canvas, shape});
          break;
      }
    }
  }

  /**
   * 获取鼠标按下的事件
   * @param event 事件
   * @param shape 形状
   * @param eventName 事件名称
   */
  onMouseDown(event: any, shape: Node, eventName: string) {
    if (event.button === LEFT_BUTTON) {
      this.mousedownShape = shape;
      this.mousedown = true;
    }
    this.canvas.emit(eventName, {event, canvas: this.canvas, shape});
  }

  onMouseMove(event: any, shape: Node, eventName: string) {
    if (this.dragging) {
      if (this.draggingShape) {
        this.canvas.emit('node:drag', {event, shape: this.draggingShape});
      } else {
        this.canvas.emit('drag', {event, shape});
      }
    } else if (this.mousedown) {
      const mousedownShape = this.mousedownShape;
      if (mousedownShape) {
        this.draggingShape = mousedownShape;
        this.dragging = true;
        this.canvas.emit('node:dragstart', {event, shape: this.draggingShape});
      } else if (!mousedownShape && this.canvas.get('draggable')) {
        this.dragging = true;
        this.canvas.emit('dragstart', {event, shape});
      }
    } else {
      this.canvas.emit(eventName, {event, shape});
    }
  }

  onMouseUp(event: any, shape: Node, eventName: string) {
    if (event.button === LEFT_BUTTON) {
      this.mousedown = false;
      const draggingShape = this.draggingShape;
      if (this.dragging) {
        // 结束前吧最后一次拖拽点事件触发出去
        if (draggingShape) {
          this.canvas.emit('node:drop', {event, shape: draggingShape});
        }
        this.canvas.emit('node:dragend', {event, shape: draggingShape});
        this.afterDrag(draggingShape, event);
      } else {
        this.mousedownShape = null;
      }
      this.canvas.emit(eventName, {event, shape});
    } else {
      this.canvas.emit(eventName, {event, shape});
    }
  }

  ondragover = (event: any) => {
    // 触发ondrop事件，必须在这个位置阻止浏览器的默认行为,否则监听不到
    event.preventDefault();
    this.canvas.emit('ondragover', {event, canvas: this.canvas});
  }

  afterDrag(draggingShape: Node, event: any) {
    if (draggingShape) {
      this.draggingShape = null;
    }
    this.dragging = false;
  }
  /** 销毁所有事件 */
  destoryEvents() {
    const el = this.canvas.get('el');
    EVENTS.forEach((eventName: string) => {
      el.removeEventListener(eventName, this.eventCallback);
    });
  }
  destroy() {
    // 清理事件
    this.destoryEvents();
    // 清理缓存的对象
    this.canvas = null;
    this.draggingShape = null;
    this.mousedown = false;
  }
}
