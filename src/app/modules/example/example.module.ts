import { NgModule } from '@angular/core';
import { CommonModule } from '@angular/common';
import { FormsModule } from '@angular/forms';
import { CanvasExampleComponent } from './canvas-example/canvas-example.component';
import { ExampleRoutingModule } from './example-routing.module';
import { WebGlComponent } from './web-gl/web-gl.component';
import { ElementExampleComponent } from './element-example/element-example.component';
import { Canvas2ExampleComponent } from './canvas2-example/canvas2-example.component';

@NgModule({
  declarations: [
    CanvasExampleComponent,
    WebGlComponent,
    ElementExampleComponent,
    Canvas2ExampleComponent,
  ],
  imports: [
    CommonModule,
    FormsModule,
    ExampleRoutingModule,
  ]
})
export class ExampleModule { }
