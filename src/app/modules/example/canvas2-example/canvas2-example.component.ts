import { Component, OnInit, ViewChild, ElementRef } from '@angular/core';
import { Graph } from 'src/app/lib3';

@Component({
  selector: 'app-canvas2-example',
  templateUrl: './canvas2-example.component.html',
  styleUrls: ['./canvas2-example.component.less']
})
export class Canvas2ExampleComponent implements OnInit {

  @ViewChild('graphcontainer', { static: true }) graphContainer: ElementRef;

  public items: any[] = [
    // {
    //   shapeName: 'rect',
    //   label: '矩形',
    //   fillStyle: '#722ed1',
    // },
    // {
    //   shapeName: 'circle',
    //   label: '圆形',
    //   fillStyle: '#4d9f0c',
    // },
  ];
  public size = {
    width: 800,
    height: 600,
  };

  public graph: Graph;

  constructor() { }

  ngOnInit() {
    const size = this.size;
    this.graph = new Graph({
      container: this.graphContainer.nativeElement,
      width: size.width,
      height: size.height,
    });
    // this.graph.read({
    //   nodes: [
    //     this.getNodeOption(120, 40, 120, 120),
    //     this.getNodeOption(160, 80, 120, 120),
    //   ]
    // });
    this.graph.read({
      nodes: this.createMoreNode(300, 500, 500)
    });
  }

  getNodeOption(x: number, y: number, width?: number, height?: number) {
    return {
      width: width || 120,
      height: height || 40,
      x: x || 30,
      y: y || 60,
      shapeName: 'base-node'
    };
  }

  createMoreNode(count: number, x: number, y: number, r?: number) {
    const output = [];
    for (let idx = 0; idx < count; idx++) {
      const nodeConfig = {
        width: r || 60,
        height: r || 60,
        x: Math.floor(Math.random() * x),
        y: Math.floor(Math.random() * y),
        shapeName: 'base-node'
      };
      output.push(nodeConfig);
    }
    return output;
  }

  onDragStart(event: DragEvent, item: any) {
    // const baseConfig = this.createShape(item);
    // this.canvas.addPreparNode(baseConfig);
  }

}
