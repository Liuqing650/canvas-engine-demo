import { TestBed, async } from '@angular/core/testing';
import EventEmitter from './index';

describe('EventEmitter', () => {
  beforeEach(async(() => TestBed.configureTestingModule({})));

  it('test EventEmitter type', () => {
    const emitter: EventEmitter = new EventEmitter();
    expect(typeof emitter).toEqual('object');
    expect(typeof emitter.on).toEqual('function');
    expect(typeof emitter.emit).toEqual('function');
    expect(typeof emitter.getEvents).toEqual('function');
    expect(typeof emitter.off).toEqual('function');
  });

  it('test EventEmitter on', () => {
    const emitter: EventEmitter = new EventEmitter();
    const fn = () => {};

    emitter.on('click', fn);
    emitter.on('click', fn);

    emitter.on('mouseover', fn);
    expect(emitter.getEvents()).toEqual({
      click: [
        { callback: fn },
        { callback: fn },
      ],
      mouseover: [{ callback: fn }],
    });
  });

  it('test EventEmitter emit', () => {
    const emitter: EventEmitter = new EventEmitter();
    let count = 10;

    const fn = (...args: any[]) => {
      count = args.reduce((r, c) => {
        return r + c;
      }, count);
    };

    emitter.on('click', fn);

    emitter.emit('click', 10, 20, 30);

    expect(count).toBe(10 + 10 + 20 + 30);

    expect(emitter.getEvents()).toEqual({
      click: [{ callback: fn }],
    });
  });

  it('test EventEmitter empty', () => {
    const emitter: EventEmitter = new EventEmitter();

    const fn = () => {};

    emitter.on('click', fn);

    expect(emitter.getEvents().click.length).toEqual(1);

    // 触发一次点击后，事件将被注销掉
    emitter.off('click', fn);

    expect(emitter.getEvents()).toEqual({});
  });
});
