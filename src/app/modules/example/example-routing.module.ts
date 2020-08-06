import { NgModule } from '@angular/core';
import { RouterModule, Routes } from '@angular/router';
import { CanvasExampleComponent } from './canvas-example/canvas-example.component';
import { WebGlComponent } from './web-gl/web-gl.component';
import { ElementExampleComponent } from './element-example/element-example.component';
import { Canvas2ExampleComponent } from './canvas2-example/canvas2-example.component';

const routes: Routes = [
  {
    path: '',
    children: [
      {
        path: 'canvas',
        component: CanvasExampleComponent,
        data: { title: 'Canvas引擎Demo' },
      },
      {
        path: 'canvas2',
        component: Canvas2ExampleComponent,
        data: { title: 'Canvas引擎Demo' },
      },
      {
        path: 'webgl',
        component: WebGlComponent,
        data: { title: 'web-gl' },
      },
      {
        path: 'element',
        component: ElementExampleComponent,
        data: { title: 'element' },
      },
      {
        path: '',
        redirectTo: '/example/canvas2',
        pathMatch: 'full',
        data: { title: 'Element' },
      },
    ],
  },
  {
    path: '',
    redirectTo: '/example/canvas2',
    pathMatch: 'full',
    data: { title: 'Canvas引擎Demo' },
  },
];

@NgModule({
  imports: [RouterModule.forChild(routes)],
  exports: [RouterModule]
})
export class ExampleRoutingModule {}
