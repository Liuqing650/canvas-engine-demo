import { AbstractContainer } from '../abstract/container';

export class Container extends AbstractContainer {
  constructor(option: any) {
    super(option);
  }

  public initContainer() {
    const size = this.getSize();
    super.initContainer();
  }

  public getSize(): { width: number; height: number; } {
    const width = this.get('width') || 500;
    const height = this.get('height') || 500;
    return {width, height};
  }

  public createDivElement(): HTMLDivElement {
    const divElement = document.createElement('div');
    divElement.style.position = 'absolute';
    divElement.style.top = '0';
    divElement.style.right = '0';
    divElement.style.bottom = '0';
    divElement.style.left = '0';
    divElement.style.zIndex = '1';
    divElement.style.background = 'transparent';
    return divElement;
  }

  public appendElement(element: HTMLElement) {
    const container: HTMLElement = this.get('container');
    container.append(element);
  }
}
