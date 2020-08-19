import { Base } from './base';
import { isString } from '../../utils';

export abstract class AbstractContainer extends Base {

  constructor(cfg: any) {
    super(cfg);
    this.initContainer();
  }

  public initContainer() {
    let container = this.get('container');
    if (isString(container)) {
      container = document.getElementById(container);
      this.set('container', container);
    }
  }
}
