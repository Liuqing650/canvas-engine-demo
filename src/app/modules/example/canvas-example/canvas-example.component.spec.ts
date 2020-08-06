import { async, ComponentFixture, TestBed } from '@angular/core/testing';

import { CanvasExampleComponent } from './canvas-example.component';

describe('CanvasExampleComponent', () => {
  let component: CanvasExampleComponent;
  let fixture: ComponentFixture<CanvasExampleComponent>;

  beforeEach(async(() => {
    TestBed.configureTestingModule({
      declarations: [ CanvasExampleComponent ]
    })
    .compileComponents();
  }));

  beforeEach(() => {
    fixture = TestBed.createComponent(CanvasExampleComponent);
    component = fixture.componentInstance;
    fixture.detectChanges();
  });

  it('should create', () => {
    expect(component).toBeTruthy();
  });
});
