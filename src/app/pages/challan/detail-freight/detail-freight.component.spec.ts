import { async, ComponentFixture, TestBed } from '@angular/core/testing';

import { DetailFreightComponent } from './detail-freight.component';

describe('DetailFreightComponent', () => {
  let component: DetailFreightComponent;
  let fixture: ComponentFixture<DetailFreightComponent>;

  beforeEach(async(() => {
    TestBed.configureTestingModule({
      declarations: [ DetailFreightComponent ]
    })
    .compileComponents();
  }));

  beforeEach(() => {
    fixture = TestBed.createComponent(DetailFreightComponent);
    component = fixture.componentInstance;
    fixture.detectChanges();
  });

  it('should create', () => {
    expect(component).toBeTruthy();
  });
});
