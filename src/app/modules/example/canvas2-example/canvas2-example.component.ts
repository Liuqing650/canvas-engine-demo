import { Component, OnInit } from '@angular/core';

@Component({
  selector: 'app-canvas2-example',
  templateUrl: './canvas2-example.component.html',
  styleUrls: ['./canvas2-example.component.less']
})
export class Canvas2ExampleComponent implements OnInit {

  public items: any[] = [
    {
      shapeName: 'rect',
      label: '矩形',
      fillStyle: '#722ed1',
    },
    {
      shapeName: 'circle',
      label: '圆形',
      fillStyle: '#4d9f0c',
    },
  ];
  constructor() { }

  ngOnInit() {
  }


  onDragStart(event: DragEvent, item: any) {
    // const baseConfig = this.createShape(item);
    // this.canvas.addPreparNode(baseConfig);
  }

}
