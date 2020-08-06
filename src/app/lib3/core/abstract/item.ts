import { GItemModel } from './interface';
import { mix } from '../../utils';

export abstract class AbstractItem {

  public model: GItemModel;
  
  constructor(option: GItemModel) {
    const defaultOption = this.getDefaultOption();
    this.model = mix(defaultOption, option);
  }

  public getDefaultOption() {
    return {};
  }

  public hit(x: number, y: number, padding?: number | number[]): boolean {
    return false;
  }

  abstract draw(ctx: CanvasRenderingContext2D): void;

  public get(key: string) {
    return this[key];
  }

  public set(key: string, value: any) {
    this[key] = value;
  }

  public getModel(): GItemModel {
    return this.model;
  }
}
