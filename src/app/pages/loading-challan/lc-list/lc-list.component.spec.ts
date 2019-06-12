import { async, ComponentFixture, TestBed } from '@angular/core/testing';

import { LcListComponent } from './lc-list.component';

describe('LcListComponent', () => {
  let component: LcListComponent;
  let fixture: ComponentFixture<LcListComponent>;

  beforeEach(async(() => {
    TestBed.configureTestingModule({
      declarations: [ LcListComponent ]
    })
    .compileComponents();
  }));

  beforeEach(() => {
    fixture = TestBed.createComponent(LcListComponent);
    component = fixture.componentInstance;
    fixture.detectChanges();
  });

  it('should create', () => {
    expect(component).toBeTruthy();
  });
});
