import { NgModule } from '@angular/core';
import { CommonModule } from '@angular/common';
import { NavBarComponent } from './nav-bar/nav-bar.component';
import { LoggedUserComponent } from './logged-user/logged-user.component';
import { BalanceComponent } from './balance/balance.component';
import { RechargeComponent } from './recharge/recharge.component';
import { CardComponent } from './card/card.component';
import { SubscriptionComponent } from './subscription/subscription.component';
import { SubscriptionFormComponent } from './subscription-form/subscription-form.component';
import { AddChannelComponent } from './add-channel/add-channel.component';
import { CurrentSubscriptionComponent } from './current-subscription/current-subscription.component';
import { FormsModule, ReactiveFormsModule } from '@angular/forms';

@NgModule({
  declarations: [
    NavBarComponent,
    LoggedUserComponent,
    BalanceComponent,
    RechargeComponent,
    CardComponent,
    SubscriptionComponent,
    SubscriptionFormComponent,
    AddChannelComponent,
    CurrentSubscriptionComponent,
  ],
  imports: [CommonModule, FormsModule,  ReactiveFormsModule],
  exports: [
    NavBarComponent,
    LoggedUserComponent,
    BalanceComponent,
    RechargeComponent,
    CardComponent,
    SubscriptionComponent,
    SubscriptionFormComponent,
    AddChannelComponent,
    CurrentSubscriptionComponent,
  ],
})
export class ComponentsModule {}
