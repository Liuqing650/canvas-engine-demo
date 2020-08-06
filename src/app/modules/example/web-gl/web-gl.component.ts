import { Component, OnInit, ViewChild, ElementRef } from '@angular/core';

@Component({
  selector: 'app-web-gl',
  templateUrl: './web-gl.component.html',
  styleUrls: ['./web-gl.component.less']
})
export class WebGlComponent implements OnInit {

  @ViewChild('graphcontainer', { static: true }) container: ElementRef;

  constructor() { }

  ngOnInit() {
    this.render();
  }

  /**
   * 创建元素
   * @param tagName 元素标签
   */
  createElement<K extends keyof HTMLElementTagNameMap>(tagName: K) {
    return document.createElement(tagName);
  }

  render() {
    const canvas = this.createElement('canvas');
    const gl = canvas.getContext('experimental-webgl');
    const program = gl.createProgram();
    gl.useProgram(program);
  }
}
