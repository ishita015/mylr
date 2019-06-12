import { async, ComponentFixture, TestBed } from '@angular/core/testing';

import { CreateLrFormComponent } from './create-lr-form.component';

describe('CreateLrFormComponent', () => {
  let component: CreateLrFormComponent;
  let fixture: ComponentFixture<CreateLrFormComponent>;

  beforeEach(async(() => {
    TestBed.configureTestingModule({
      declarations: [ CreateLrFormComponent ]
    })
    .compileComponents();
  }));

  beforeEach(() => {
    fixture = TestBed.createComponent(CreateLrFormComponent);
    component = fixture.componentInstance;
    fixture.detectChanges();
  });

  it('should create', () => {
    expect(component).toBeTruthy();
  });
});
