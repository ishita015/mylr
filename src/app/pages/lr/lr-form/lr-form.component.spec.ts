import { async, ComponentFixture, TestBed } from '@angular/core/testing';

import { LrFormComponent } from './lr-form.component';

describe('LrFormComponent', () => {
  let component: LrFormComponent;
  let fixture: ComponentFixture<LrFormComponent>;

  beforeEach(async(() => {
    TestBed.configureTestingModule({
      declarations: [ LrFormComponent ]
    })
    .compileComponents();
  }));

  beforeEach(() => {
    fixture = TestBed.createComponent(LrFormComponent);
    component = fixture.componentInstance;
    fixture.detectChanges();
  });

  it('should create', () => {
    expect(component).toBeTruthy();
  });
});
