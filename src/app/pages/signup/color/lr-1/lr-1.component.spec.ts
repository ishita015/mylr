import { async, ComponentFixture, TestBed } from '@angular/core/testing';

import { Lr1Component } from './lr-1.component';

describe('Lr1Component', () => {
  let component: Lr1Component;
  let fixture: ComponentFixture<Lr1Component>;

  beforeEach(async(() => {
    TestBed.configureTestingModule({
      declarations: [ Lr1Component ]
    })
    .compileComponents();
  }));

  beforeEach(() => {
    fixture = TestBed.createComponent(Lr1Component);
    component = fixture.componentInstance;
    fixture.detectChanges();
  });

  it('should create', () => {
    expect(component).toBeTruthy();
  });
});
