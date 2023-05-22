import { ComponentFixture, TestBed } from '@angular/core/testing';

import { RechargeComponent } from './recharge.component';
import { CUSTOM_ELEMENTS_SCHEMA } from '@angular/core';
import { BalanceServiceService } from 'src/app/services/balance-service.service';
import { FormsModule } from '@angular/forms';

describe('RechargeComponent', () => {
  let component: RechargeComponent;
  let fixture: ComponentFixture<RechargeComponent>;

  beforeEach(async () => {
    await TestBed.configureTestingModule({
      declarations: [ RechargeComponent ],
      schemas: [CUSTOM_ELEMENTS_SCHEMA],
      providers: [{ provide: BalanceServiceService, useValue: {} }],
      imports:[FormsModule]
    })
    .compileComponents();

    fixture = TestBed.createComponent(RechargeComponent);
    component = fixture.componentInstance;
    fixture.detectChanges();
  });

  it('should create', () => {
    expect(component).toBeTruthy();
  });
});
