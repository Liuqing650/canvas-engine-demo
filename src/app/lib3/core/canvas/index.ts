import { AbstractCanvas } from '../abstract/canvas';

export class Canvas extends AbstractCanvas {

  public createCanvas() {
    const element = document.createElement('canvas');
    element.style.position = 'absolute';
    element.style.left = '0';
    element.style.top = '0';
    element.style.outline = 'none';
    return element;
  }
}
