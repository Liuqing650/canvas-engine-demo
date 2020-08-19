import { GItemOption } from './interface';
import { mix } from '../../utils';

export abstract class AbstractItem {

  public option: GItemOption;

  constructor(option: GItemOption) {
    const defaultOption = this.getDefaultOption();
    this.option = mix(defaultOption, option);
  }

  public getDefaultOption() {
    return {};
  }

  public hit(x: number, y: number, padding?: number | number[]): boolean {
    return false;
  }

  abstract draw(ctx: CanvasRenderingContext2D): void;

  public get(key: string) {
    return this.option[key];
  }

  public set(key: string, value: any) {
    this.option[key] = value;
  }
}
