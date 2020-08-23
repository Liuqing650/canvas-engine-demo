import Emiter from '../emitter';
import { GObject } from './interface';
import { mix } from '../../utils';

export abstract class Base extends Emiter {
  public option: GObject;

  constructor(option: any) {
    super();
    const defaultOption = this.getDefaultOption();
    this.option = mix(defaultOption, option);
  }

  public getDefaultOption() {
    return {};
  }

  public get(key: string) {
    return this.option[key];
  }

  public set(key: string, value: any) {
    this.option[key] = value;
  }

  public destroy() {
    this.option = {
      destroyed: true,
    };
    this.off();
  }
}
