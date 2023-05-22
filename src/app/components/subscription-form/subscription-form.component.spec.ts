import { ComponentFixture, TestBed } from '@angular/core/testing';

import { SubscriptionFormComponent } from './subscription-form.component';
import { CUSTOM_ELEMENTS_SCHEMA } from '@angular/core';

describe('SubscriptionFormComponent', () => {
  let component: SubscriptionFormComponent;
  let fixture: ComponentFixture<SubscriptionFormComponent>;

  beforeEach(async () => {
    await TestBed.configureTestingModule({
      declarations: [ SubscriptionFormComponent ],
      schemas: [CUSTOM_ELEMENTS_SCHEMA],
    })
    .compileComponents();

    fixture = TestBed.createComponent(SubscriptionFormComponent);
    component = fixture.componentInstance;
    fixture.detectChanges();
  });

  it('should create', () => {
    expect(component).toBeTruthy();
  });
});
