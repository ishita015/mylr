import { async, ComponentFixture, TestBed } from '@angular/core/testing';

import { CreateFreightComponent } from './create-freight.component';

describe('CreateFreightComponent', () => {
  let component: CreateFreightComponent;
  let fixture: ComponentFixture<CreateFreightComponent>;

  beforeEach(async(() => {
    TestBed.configureTestingModule({
      declarations: [ CreateFreightComponent ]
    })
    .compileComponents();
  }));

  beforeEach(() => {
    fixture = TestBed.createComponent(CreateFreightComponent);
    component = fixture.componentInstance;
    fixture.detectChanges();
  });

  it('should create', () => {
    expect(component).toBeTruthy();
  });
});
