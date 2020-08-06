import { NgModule } from '@angular/core';
import { CommonModule } from '@angular/common';
import { FormsModule } from '@angular/forms';
import { CanvasExampleComponent } from './canvas-example/canvas-example.component';
import { ExampleRoutingModule } from './example-routing.module';

@NgModule({
  declarations: [
    CanvasExampleComponent,
  ],
  imports: [
    CommonModule,
    FormsModule,
    ExampleRoutingModule,
  ]
})
export class ExampleModule { }
