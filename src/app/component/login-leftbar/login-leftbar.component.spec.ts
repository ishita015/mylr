import { async, ComponentFixture, TestBed } from '@angular/core/testing';

import { LoginLeftbarComponent } from './login-leftbar.component';

describe('LoginLeftbarComponent', () => {
  let component: LoginLeftbarComponent;
  let fixture: ComponentFixture<LoginLeftbarComponent>;

  beforeEach(async(() => {
    TestBed.configureTestingModule({
      declarations: [ LoginLeftbarComponent ]
    })
    .compileComponents();
  }));

  beforeEach(() => {
    fixture = TestBed.createComponent(LoginLeftbarComponent);
    component = fixture.componentInstance;
    fixture.detectChanges();
  });

  it('should create', () => {
    expect(component).toBeTruthy();
  });
});
