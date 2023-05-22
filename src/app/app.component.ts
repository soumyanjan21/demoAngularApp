import { Component, inject } from '@angular/core';
import { BalanceServiceService } from './services/balance-service.service';
import { DataService } from './services/data.service';
import { SubscriptionService } from './services/subscription.service';

@Component({
  selector: 'app-root',
  templateUrl: './app.component.html',
  styleUrls: ['./app.component.scss'],
})
export class AppComponent {
  subscriptionService = inject(SubscriptionService);
  balanceService = inject(BalanceServiceService);
  dataService = inject(DataService);
  title = 'SatTV';
  showRechargeMOdal = false;
  showSubscribeModal = false;
  currentBalance = this.balanceService.getBalance();
  currentSubscription = this.subscriptionService.getSubscriptionDetails();
  basePacks$ = this.dataService.getBasePacks();
  channels$ = this.dataService.getChannels();
  services$ = this.dataService.getServices();
  showAddModal = false;
}
