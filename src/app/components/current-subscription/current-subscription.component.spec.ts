import { ComponentFixture, TestBed } from '@angular/core/testing';

import { CurrentSubscriptionComponent } from './current-subscription.component';
import { CUSTOM_ELEMENTS_SCHEMA } from '@angular/core';

describe('CurrentSubscriptionComponent', () => {
  let component: CurrentSubscriptionComponent;
  let fixture: ComponentFixture<CurrentSubscriptionComponent>;

  beforeEach(async () => {
    await TestBed.configureTestingModule({
      declarations: [ CurrentSubscriptionComponent ],
      schemas: [CUSTOM_ELEMENTS_SCHEMA]
    })
    .compileComponents();

    fixture = TestBed.createComponent(CurrentSubscriptionComponent);
    component = fixture.componentInstance;
    fixture.detectChanges();
  });

  it('should create', () => {
    expect(component).toBeTruthy();
  });
});
