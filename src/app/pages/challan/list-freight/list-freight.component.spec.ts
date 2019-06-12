import { async, ComponentFixture, TestBed } from '@angular/core/testing';

import { ListFreightComponent } from './list-freight.component';

describe('ListFreightComponent', () => {
  let component: ListFreightComponent;
  let fixture: ComponentFixture<ListFreightComponent>;

  beforeEach(async(() => {
    TestBed.configureTestingModule({
      declarations: [ ListFreightComponent ]
    })
    .compileComponents();
  }));

  beforeEach(() => {
    fixture = TestBed.createComponent(ListFreightComponent);
    component = fixture.componentInstance;
    fixture.detectChanges();
  });

  it('should create', () => {
    expect(component).toBeTruthy();
  });
});
