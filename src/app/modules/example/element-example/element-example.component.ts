import { Component, OnInit, ViewChild, ElementRef } from '@angular/core';
import { Graph } from 'src/app/lib2/graph';

@Component({
  selector: 'app-element-example',
  templateUrl: './element-example.component.html',
  styleUrls: ['./element-example.component.less']
})
export class ElementExampleComponent implements OnInit {


  @ViewChild('graphcontainer', { static: true }) graphContainer: ElementRef;

  public graph: Graph;
  constructor() { }

  public size = {
    width: 800,
    height: 600,
  };

  ngOnInit() {
    this.renderElement();
  }


  renderElement() {
    const size = this.size;
    this.graph = new Graph({
      container: this.graphContainer.nativeElement,
      width: size.width,
      height: size.height,
    });
    this.renderGraph();
    console.log(this.graph);
  }

  renderGraph() {
    this.graph.render();
    this.graph.addItem({x: 100, y: 300, width: 300, height: 200});
  }
}
