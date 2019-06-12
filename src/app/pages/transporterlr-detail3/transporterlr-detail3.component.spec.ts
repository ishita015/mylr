import { async, ComponentFixture, TestBed } from '@angular/core/testing';

import { TransporterlrDetail3Component } from './transporterlr-detail3.component';

describe('TransporterlrDetail3Component', () => {
  let component: TransporterlrDetail3Component;
  let fixture: ComponentFixture<TransporterlrDetail3Component>;

  beforeEach(async(() => {
    TestBed.configureTestingModule({
      declarations: [ TransporterlrDetail3Component ]
    })
    .compileComponents();
  }));

  beforeEach(() => {
    fixture = TestBed.createComponent(TransporterlrDetail3Component);
    component = fixture.componentInstance;
    fixture.detectChanges();
  });

  it('should create', () => {
    expect(component).toBeTruthy();
  });
});
