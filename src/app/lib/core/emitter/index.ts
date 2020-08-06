interface EventType {
  readonly callback: Function;
}

type EventsType = Record<string, EventType[]>;

export default class EventEmitter {
  private _events: EventsType = {};

  /**
   * 监听一个事件
   * @param event 事件名
   * @param callback 回调函数
   * @param once 只执行一次
   */
  on(event: string, callback: Function) {
    if (!this._events[event]) {
      this._events[event] = [];
    }
    this._events[event].push({
      callback,
    });
    return this;
  }

  /**
   * 触发一个事件
   * @param event 事件名
   * @param args 回调事件
   */
  emit(event: string, ...args: any[]) {
    const events = this._events[event] || [];

    const doEmit = (es: EventType[]) => {
      const length = es.length;
      for (let i = 0; i < length; i++) {
        if (!es[i]) {
          continue;
        }
        const { callback } = es[i];

        callback.apply(this, args);
      }
    };

    doEmit(events);
  }

  /**
   * 取消监听一个事件，或者一个channel
   * @param event 事件名
   * @param callback 回调函数
   */
  off(event?: string, callback?: Function) {
    if (!event) {
      this._events = {};
    } else {
      // 如果没有指定删除的回调方法，就清空该事件中所有回调函数
      if (!callback) {
        delete this._events[event];
      } else {
        const events = this._events[event] || [];

        let length = events.length;
        for (let i = 0; i < length; i++) {
          if (events[i].callback === callback) {
            events.splice(i, 1);

            length--;
            i--;
          }
        }

        if (events.length === 0) {
          delete this._events[event];
        }
      }
    }

    return this;
  }

  getEvents() {
    return this._events;
  }
}
