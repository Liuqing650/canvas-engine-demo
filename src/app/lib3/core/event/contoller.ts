import { Canvas } from '../canvas';
import { Graph } from '../../graph';

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

export class EventController {
  private canvas: Canvas;
  private graph: Graph;

  constructor(option: {canvas: Canvas, graph: Graph}) {
    this.canvas = option.canvas;
    this.graph = option.graph;
    this.initController();
  }

  private initController() {
    const el = this.canvas.canvasElement;
    EVENTS.forEach((eventName: string) => {
      el.addEventListener(eventName, this.eventCallback);
    });
  }

  public eventCallback = (event: any) => {
    const type = event.type;
    this.triggerEvent(type, event);
  }

  public triggerEvent(eventName: string, event: any) {
    if (eventName === 'dragover') {
      this.ondragover(event);
    } else {
      this.graph.emit(eventName, {event});
    }
  }

  public ondragover = (event: any) => {
    // 触发ondrop事件，必须在这个位置阻止浏览器的默认行为,否则监听不到
    event.preventDefault();
    this.graph.emit('ondragover', {event, canvas: this.canvas});
  }

  /** 销毁所有事件 */
  public destoryEvents() {
    const el = this.canvas.canvasElement;
    EVENTS.forEach((eventName: string) => {
      el.removeEventListener(eventName, this.eventCallback);
    });
  }

  public destroy() {
    // 清理事件
    this.destoryEvents();
  }
}
