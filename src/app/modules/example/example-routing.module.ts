import { NgModule } from '@angular/core';
import { RouterModule, Routes } from '@angular/router';
import { CanvasExampleComponent } from './canvas-example/canvas-example.component';
import { WebGlComponent } from './web-gl/web-gl.component';

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
        path: 'webgl',
        component: WebGlComponent,
        data: { title: 'web-gl' },
      },
      {
        path: '',
        redirectTo: '/example/canvas',
        pathMatch: 'full',
        data: { title: 'Canvas引擎Demo' },
      },
    ],
  },
  {
    path: '',
    redirectTo: '/example/canvas',
    pathMatch: 'full',
    data: { title: 'Canvas引擎Demo' },
  },
];

@NgModule({
  imports: [RouterModule.forChild(routes)],
  exports: [RouterModule]
})
export class ExampleRoutingModule {}
