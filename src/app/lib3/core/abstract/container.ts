import { Base } from './base';

export abstract class AbstractContainer extends Base {

  public chilrens: any[];

  constructor(cfg: any) {
    super(cfg);
  }
}