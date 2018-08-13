import { async, ComponentFixture, TestBed } from '@angular/core/testing';

import { RowFloatingInputComponent } from './row-floating-input.component';

describe('RowFloatingInputComponent', () => {
  let component: RowFloatingInputComponent;
  let fixture: ComponentFixture<RowFloatingInputComponent>;

  beforeEach(async(() => {
    TestBed.configureTestingModule({
      declarations: [ RowFloatingInputComponent ]
    })
    .compileComponents();
  }));

  beforeEach(() => {
    fixture = TestBed.createComponent(RowFloatingInputComponent);
    component = fixture.componentInstance;
    fixture.detectChanges();
  });

  it('should create', () => {
    expect(component).toBeTruthy();
  });
});
