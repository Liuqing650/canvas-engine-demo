import Emiter from '../emitter';
import { GBase, AnyObject } from '../interface';
import mix from '../../util/mix';

export abstract class Base extends Emiter implements GBase {

  cfg: AnyObject;

  destroyed = false;

  constructor(cfg: any) {
    super();
    const defaultCfg = this.getDefaultCfg();
    this.cfg = mix(defaultCfg, cfg);
  }

  getDefaultCfg() {
    return {};
  }

  get(key: string) {
    return this.cfg[key];
  }

  set(key: string, value: any) {
    this.cfg[key] = value;
  }

  destroy() {
    this.cfg = {
      destroyed: true,
    };
    this.off();
    this.destroyed = true;
  }
}
