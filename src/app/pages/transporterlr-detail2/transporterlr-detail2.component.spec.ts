import { async, ComponentFixture, TestBed } from '@angular/core/testing';

import { TransporterlrDetail2Component } from './transporterlr-detail2.component';

describe('TransporterlrDetail2Component', () => {
  let component: TransporterlrDetail2Component;
  let fixture: ComponentFixture<TransporterlrDetail2Component>;

  beforeEach(async(() => {
    TestBed.configureTestingModule({
      declarations: [ TransporterlrDetail2Component ]
    })
    .compileComponents();
  }));

  beforeEach(() => {
    fixture = TestBed.createComponent(TransporterlrDetail2Component);
    component = fixture.componentInstance;
    fixture.detectChanges();
  });

  it('should create', () => {
    expect(component).toBeTruthy();
  });
});
