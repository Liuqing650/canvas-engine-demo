import { AbstractContainer } from '../abstract/container';

export class Container extends AbstractContainer {
  constructor(option: any) {
    super(option);
  }

  public getSize(): { width: number; height: number; } {
    const width = this.get('width') || 500;
    const height = this.get('height') || 500;
    return {width, height};
  }
}
