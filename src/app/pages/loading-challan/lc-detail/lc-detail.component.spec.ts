import { async, ComponentFixture, TestBed } from '@angular/core/testing';

import { LcDetailComponent } from './lc-detail.component';

describe('LcDetailComponent', () => {
  let component: LcDetailComponent;
  let fixture: ComponentFixture<LcDetailComponent>;

  beforeEach(async(() => {
    TestBed.configureTestingModule({
      declarations: [ LcDetailComponent ]
    })
    .compileComponents();
  }));

  beforeEach(() => {
    fixture = TestBed.createComponent(LcDetailComponent);
    component = fixture.componentInstance;
    fixture.detectChanges();
  });

  it('should create', () => {
    expect(component).toBeTruthy();
  });
});
