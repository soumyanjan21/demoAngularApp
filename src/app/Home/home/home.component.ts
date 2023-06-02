import { Component, inject } from '@angular/core';
import { BalanceServiceService } from 'src/app/services/balance-service.service';
import { DataService } from 'src/app/services/data.service';
import { SubscriptionService } from 'src/app/services/subscription.service';

@Component({
  selector: 'app-home',
  templateUrl: './home.component.html',
  styleUrls: ['./home.component.scss'],
})
export class HomeComponent {
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
