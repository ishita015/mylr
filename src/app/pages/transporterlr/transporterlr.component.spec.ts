import { async, ComponentFixture, TestBed } from '@angular/core/testing';

import { TransporterlrComponent } from './transporterlr.component';

describe('TransporterlrComponent', () => {
  let component: TransporterlrComponent;
  let fixture: ComponentFixture<TransporterlrComponent>;

  beforeEach(async(() => {
    TestBed.configureTestingModule({
      declarations: [ TransporterlrComponent ]
    })
    .compileComponents();
  }));

  beforeEach(() => {
    fixture = TestBed.createComponent(TransporterlrComponent);
    component = fixture.componentInstance;
    fixture.detectChanges();
  });

  it('should create', () => {
    expect(component).toBeTruthy();
  });
});
