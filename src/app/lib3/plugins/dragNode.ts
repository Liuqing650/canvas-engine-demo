import { PluginCore } from '../modules/plugin';
import { Node } from '../modules/node';

export class DragNode extends PluginCore {

  public mouseDown: { x: number; y: number };
  public draggableBox: {x: number, y: number};
  public shouledAnimationFrame = false;

  public initPlugin() {
    const graph = this.get('graph');
    graph.on('node:dragstart', this.onShapeDragStart);
    graph.on('node:drag', this.onShapeDrag);
    graph.on('node:drop', this.onShapeDrop);
  }

  /** 图形拖拽 */
  public onShapeDragStart = ({ item, x, y }) => {
    const bbox = item.getBBox();
    this.mouseDown = {x, y};
    this.draggableBox = {x: bbox.x, y: bbox.y};
  }

  /** 图形拖拽中 */
  public onShapeDrag = ({ event, item }: {event: MouseEvent; item: Node}) => {
    if (this.shouledAnimationFrame || !this.mouseDown) {
      return null;
    }
    this.shouledAnimationFrame = true;
    const movex = (event.offsetX - this.mouseDown.x) << 0;
    const movey = (event.offsetY - this.mouseDown.y) << 0;
    const { x, y } = this.draggableBox;
    requestAnimationFrame(() => {
      const graph = this.get('graph');
      item.updatePosition(x + movex, y + movey);
      if (graph.highRender) {
        graph.drawActive();
      } else {
        graph.refresh();
      }
      this.shouledAnimationFrame = false;
    });
  }
  /** 图形拖拽完 */
  public onShapeDrop = ({ event, item }) => {
    const graph = this.get('graph');
    if (graph.highRender) {
      graph.activeNodes.forEach((node: Node) => {
        node.show();
      });
      graph.activeNodes = [];
      graph.drawActive();
      graph.render();
    } else {
      graph.refresh();
    }
  }

  public resetMouseRecord() {
    this.mouseDown = undefined;
    this.draggableBox = undefined;
    this.shouledAnimationFrame = false;
  }

  public destroy() {
    super.destroy();
    this.resetMouseRecord();
  }
}
