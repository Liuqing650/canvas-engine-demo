import { async, ComponentFixture, TestBed } from '@angular/core/testing';

import { Canvas2ExampleComponent } from './canvas2-example.component';

describe('Canvas2ExampleComponent', () => {
  let component: Canvas2ExampleComponent;
  let fixture: ComponentFixture<Canvas2ExampleComponent>;

  beforeEach(async(() => {
    TestBed.configureTestingModule({
      declarations: [ Canvas2ExampleComponent ]
    })
    .compileComponents();
  }));

  beforeEach(() => {
    fixture = TestBed.createComponent(Canvas2ExampleComponent);
    component = fixture.componentInstance;
    fixture.detectChanges();
  });

  it('should create', () => {
    expect(component).toBeTruthy();
  });
});
