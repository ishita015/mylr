import { async, ComponentFixture, TestBed } from '@angular/core/testing';

import { Detail1Component } from './detail-1.component';

describe('Detail1Component', () => {
  let component: Detail1Component;
  let fixture: ComponentFixture<Detail1Component>;

  beforeEach(async(() => {
    TestBed.configureTestingModule({
      declarations: [ Detail1Component ]
    })
    .compileComponents();
  }));

  beforeEach(() => {
    fixture = TestBed.createComponent(Detail1Component);
    component = fixture.componentInstance;
    fixture.detectChanges();
  });

  it('should create', () => {
    expect(component).toBeTruthy();
  });
});
