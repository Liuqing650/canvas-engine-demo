import { Component, OnInit, ViewChild, ElementRef } from '@angular/core';
import { Canvas } from 'src/app/lib/core/canvas';
import { NodeConfig } from 'src/app/lib/interface';
import { throttleArray } from 'src/app/lib/util';

@Component({
  selector: 'app-canvas-example',
  templateUrl: './canvas-example.component.html',
  styleUrls: ['./canvas-example.component.less']
})
export class CanvasExampleComponent implements OnInit {

  @ViewChild('graphcontainer', { static: true }) graphContainer: ElementRef;

  public canvas: Canvas;
  constructor() { }

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
  public size = {
    width: 800,
    height: 600,
  };

  public throttleNumber = 1000;
  public moreNumber = 10000;

  ngOnInit() {
    this.renderCanvas();
  }

  renderCanvas() {
    const size = this.size;
    this.canvas = new Canvas({
      container: this.graphContainer.nativeElement,
      width: size.width,
      height: size.height,
    });
    this.renderGraph();
    // 订阅
    this.subscribe();
    console.log(this.canvas);
  }
  renderGraph() {
    // 渲染单个节点
    this.singleData();
    // 节流渲染多个节点
    // this.throttleData();
    // 直接渲染多个节点
    // this.moreData();
  }
  singleData() {
    this.canvas.clear();
    const model = this.createOndeModule();
    this.canvas.addItem(model);
  }
  throttleData() {
    const size = this.size;
    this.canvas.clear();
    const number = isNaN(Number(this.throttleNumber)) ? 0 : Number(this.throttleNumber);
    const shapes = this.createDraw(number, size.width - 100, size.height - 100);
    throttleArray(shapes, (nodeConfig: NodeConfig) => {
      this.canvas.addItem(nodeConfig);
    }, 60, 10);
  }
  moreData() {
    this.canvas.clear();
    const size = this.size;
    const number = isNaN(Number(this.moreNumber)) ? 0 : Number(this.moreNumber);
    const shapes = this.createDraw(number, size.width - 100, size.height - 100);
    this.canvas.read(shapes);
  }
  getBindEvent() {
    const event = this.canvas.getEvents();
    console.log('event------->', event);
  }
  /**
   * 订阅、服务、API请求
   */
  subscribe() {
    this.canvas.on('mousedown', (event) => {
      console.log('event', event);
      const {shape} = event;
      if (shape && shape.model) {
        console.log('我收到监听消息,你选中了%c%s', 'color: red; font-weight: 700; font-size: 24px;', `节点: ${shape.model.label}`);
        console.log('详细信息', shape.model);
      }
    });
    this.canvas.on('mouseup', () => {
      console.log('我收到监听消息,你弹起了鼠标');
    });
  }

  createOndeModule(): NodeConfig {
    const model: NodeConfig = {
      x: 200,
      y: 100,
      width: 120,
      height: 60,
      label: 'text',
      shapeName: 'rect',
      style: {
        fillStyle: '#4d9f0c',
      },
      labelStyle: {
        fontSize: 20,
        color: '#FFF'
      }
    };
    return model;
  }

  createDraw(count: number, x: number, y: number) {
    const output = [];
    for (let idx = 0; idx < count; idx++) {
      const nodeConfig = this.createOndeModule();
      nodeConfig.label = `${idx}`;
      nodeConfig.width = 30;
      nodeConfig.height = 30;
      nodeConfig.x = Math.floor(Math.random() * x);
      nodeConfig.y = Math.floor(Math.random() * y);
      output.push(nodeConfig);
    }
    return output;
  }

  createShape(item: any) {
    const base = {
      label: item.label,
      shapeName: item.shapeName,
      width: 120,
      height: 60,
      style: {
        fillStyle: item.fillStyle || '#4d9f0c',
      },
      labelStyle: {
        fontSize: 20,
        color: '#FFF'
      }
    };
    if (item.shapeName === 'circle') {
      base.height = base.width;
    }
    return base;
  }

  onDragStart(event: DragEvent, item: any) {
    const baseConfig = this.createShape(item);
    this.canvas.addPreparNode(baseConfig);
  }
}
