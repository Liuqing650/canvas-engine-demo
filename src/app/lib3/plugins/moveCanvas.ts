import { PluginCore } from '../modules/plugin';
import { Graph } from '../graph';
import { GraphOption } from '../interface';

export class CanvasMove extends PluginCore {

  constructor(option?: GraphOption) {
    super(option);
  }

  public mouseDown: { x: number; y: number };

  public initPlugin() {
    const graph = this.get('graph');
    graph.on('canvas:dragstart', this.onDragStart);
    graph.on('canvas:drag', this.onDrag);
    graph.on('canvas:drop', this.onDrop);
  }

  public onDragStart = ({ x, y }) => {
    this.mouseDown = {x, y};
  }

  public onDrag = ({event}) => {
    const movex = (event.offsetX - this.mouseDown.x) << 0;
    const movey = (event.offsetY - this.mouseDown.y) << 0;
    const graph: Graph = this.get('graph');
    console.log('graph----->', movex, movey);
    graph.translate(movex, movey);
    graph.render();
  }

  public onDrop = () => {
    const graph: Graph = this.get('graph');
  }

  public destroy() {
    super.destroy();
  }
}
