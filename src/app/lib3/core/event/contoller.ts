import { Graph } from '../../graph';

// 监听的事件
const EVENTS = [
  'click',
  'mousedown',
  'mouseup',
  'dblclick',
  'mouseout',
  'mouseover',
  'mousemove',
  'mouseleave',
  'mouseenter',
  'touchstart',
  'touchmove',
  'touchend',
  'dragenter',
  'dragover',
  'dragleave',
  'drop',
  'contextmenu',
  'mousewheel',
];

export class EventController {
  private element: HTMLElement;
  private graph: Graph;

  constructor(option: {element: HTMLElement, graph: Graph}) {
    this.element = option.element;
    this.graph = option.graph;
    this.initController();
  }

  private initController() {
    const el = this.element;
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
    this.graph.emit('ondragover', {event, graph: this.graph});
  }

  /** 销毁所有事件 */
  public destoryEvents() {
    const el = this.element;
    EVENTS.forEach((eventName: string) => {
      el.removeEventListener(eventName, this.eventCallback);
    });
  }

  public destroy() {
    // 清理事件
    this.destoryEvents();
  }
}
