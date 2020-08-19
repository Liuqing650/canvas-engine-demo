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
    this.graph.read({
      nodes: [
        this.getNodeOption(120, 40, 120, 120),
      ]
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

  onDragStart(event: DragEvent, item: any) {
    // const baseConfig = this.createShape(item);
    // this.canvas.addPreparNode(baseConfig);
  }

}
