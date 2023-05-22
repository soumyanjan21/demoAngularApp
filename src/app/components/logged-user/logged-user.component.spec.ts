import { ComponentFixture, TestBed } from '@angular/core/testing';

import { LoggedUserComponent } from './logged-user.component';
import { CUSTOM_ELEMENTS_SCHEMA } from '@angular/core';

describe('LoggedUserComponent', () => {
  let component: LoggedUserComponent;
  let fixture: ComponentFixture<LoggedUserComponent>;

  beforeEach(async () => {
    await TestBed.configureTestingModule({
      declarations: [ LoggedUserComponent ],
      schemas: [CUSTOM_ELEMENTS_SCHEMA],
    })
    .compileComponents();

    fixture = TestBed.createComponent(LoggedUserComponent);
    component = fixture.componentInstance;
    fixture.detectChanges();
  });

  it('should create', () => {
    expect(component).toBeTruthy();
  });
});
