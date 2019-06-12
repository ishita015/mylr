import { async, ComponentFixture, TestBed } from '@angular/core/testing';

import { Lr4Component } from './lr-4.component';

describe('Lr4Component', () => {
  let component: Lr4Component;
  let fixture: ComponentFixture<Lr4Component>;

  beforeEach(async(() => {
    TestBed.configureTestingModule({
      declarations: [ Lr4Component ]
    })
    .compileComponents();
  }));

  beforeEach(() => {
    fixture = TestBed.createComponent(Lr4Component);
    component = fixture.componentInstance;
    fixture.detectChanges();
  });

  it('should create', () => {
    expect(component).toBeTruthy();
  });
});
