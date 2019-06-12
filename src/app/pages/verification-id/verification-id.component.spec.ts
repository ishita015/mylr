import { async, ComponentFixture, TestBed } from '@angular/core/testing';

import { VerificationIdComponent } from './verification-id.component';

describe('VerificationIdComponent', () => {
  let component: VerificationIdComponent;
  let fixture: ComponentFixture<VerificationIdComponent>;

  beforeEach(async(() => {
    TestBed.configureTestingModule({
      declarations: [ VerificationIdComponent ]
    })
    .compileComponents();
  }));

  beforeEach(() => {
    fixture = TestBed.createComponent(VerificationIdComponent);
    component = fixture.componentInstance;
    fixture.detectChanges();
  });

  it('should create', () => {
    expect(component).toBeTruthy();
  });
});
