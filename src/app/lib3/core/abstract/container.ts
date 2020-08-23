import { Base } from './base';
import { isString, isBrowser } from '../../utils';

export abstract class AbstractContainer extends Base {

  constructor(option: any) {
    super(option);
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
