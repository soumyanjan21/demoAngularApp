import { ComponentFixture, TestBed, fakeAsync, tick } from '@angular/core/testing';
import { AddChannelComponent } from './add-channel.component';
import { CUSTOM_ELEMENTS_SCHEMA } from '@angular/core';
import { DataService } from 'src/app/services/data.service';
import { SubscriptionService } from 'src/app/services/subscription.service';
import { BalanceServiceService } from 'src/app/services/balance-service.service';
  
describe('AddChannelComponent', () => {
  let component: AddChannelComponent;
  let fixture: ComponentFixture<AddChannelComponent>;
  let dataService =  new DataService()
  let subscriptionService = jasmine.createSpyObj('SubscriptionService', ['addChannel','addService'])
  let balanceService = jasmine.createSpyObj('BalanceServiceService', ['reduceBalance'])

  beforeEach(async () => {
    await TestBed.configureTestingModule({
      declarations: [AddChannelComponent],
      schemas: [CUSTOM_ELEMENTS_SCHEMA],
      providers: [{provide:DataService, useValue:dataService},
        {provide:SubscriptionService, useValue:subscriptionService},
        {provide:BalanceServiceService, useValue:balanceService}]
    }).compileComponents();

    fixture = TestBed.createComponent(AddChannelComponent);
    component = fixture.componentInstance;
    fixture.detectChanges();
  });
});
