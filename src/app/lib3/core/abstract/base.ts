import Emiter from '../emitter';
import { GObject } from './interface';
import { mix } from '../../utils';

export abstract class Base extends Emiter {
  public cfg: GObject;

  constructor(cfg: any) {
    super();
    const defaultCfg = this.getDefaultCfg();
    this.cfg = mix(defaultCfg, cfg);
  }

  public getDefaultCfg() {
    return {};
  }

  public get(key: string) {
    return this.cfg[key];
  }

  public set(key: string, value: any) {
    this.cfg[key] = value;
  }

  public destroy() {
    this.cfg = {
      destroyed: true,
    };
    this.off();
  }
}
