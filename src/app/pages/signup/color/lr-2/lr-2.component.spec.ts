import { async, ComponentFixture, TestBed } from '@angular/core/testing';

import { Lr2Component } from './lr-2.component';

describe('Lr2Component', () => {
  let component: Lr2Component;
  let fixture: ComponentFixture<Lr2Component>;

  beforeEach(async(() => {
    TestBed.configureTestingModule({
      declarations: [ Lr2Component ]
    })
    .compileComponents();
  }));

  beforeEach(() => {
    fixture = TestBed.createComponent(Lr2Component);
    component = fixture.componentInstance;
    fixture.detectChanges();
  });

  it('should create', () => {
    expect(component).toBeTruthy();
  });
});
