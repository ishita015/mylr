import { async, ComponentFixture, TestBed } from '@angular/core/testing';

import { Lr5Component } from './lr-5.component';

describe('Lr5Component', () => {
  let component: Lr5Component;
  let fixture: ComponentFixture<Lr5Component>;

  beforeEach(async(() => {
    TestBed.configureTestingModule({
      declarations: [ Lr5Component ]
    })
    .compileComponents();
  }));

  beforeEach(() => {
    fixture = TestBed.createComponent(Lr5Component);
    component = fixture.componentInstance;
    fixture.detectChanges();
  });

  it('should create', () => {
    expect(component).toBeTruthy();
  });
});
