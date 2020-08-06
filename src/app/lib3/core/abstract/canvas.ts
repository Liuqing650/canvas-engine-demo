import { GObject } from './interface';

export abstract class AbstractCanvas {

  public canvasElement: HTMLCanvasElement;
  public ctx: CanvasRenderingContext2D | null;
  public option: GObject;

  constructor(cfg: any) {
    this.init(cfg);
  }

  private init(cfg: any) {
    this.option = Object.assign({}, cfg);
    this.initCanvas();
  }

  public initCanvas() {
    this.canvasElement = this.createCanvas();
    this.ctx = this.getCanvasContext();
  }

  abstract createCanvas(): HTMLCanvasElement;

  public getCanvasContext() {
    const context = this.canvasElement.getContext('2d');
    return context;
  }

  public getContext(): CanvasRenderingContext2D | null{
    return this.ctx;
  }

  public getCanvasElement(): HTMLCanvasElement {
    return this.canvasElement;
  }

  public get(key: string) {
    return this.option[key];
  }

  public set(key: string, value: any) {
    this.option[key] = value;
  }
}
