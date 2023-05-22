import { CUSTOM_ELEMENTS_SCHEMA, NgModule } from '@angular/core';
import { BrowserModule } from '@angular/platform-browser';
import { AppRoutingModule } from './app-routing.module';
import { AppComponent } from './app.component';
import { NavBarComponent } from './components/nav-bar/nav-bar.component';
import { LoggedUserComponent } from './components/logged-user/logged-user.component';
import { BalanceComponent } from './components/balance/balance.component';
import { RechargeComponent } from './components/recharge/recharge.component';
import { FormsModule } from '@angular/forms';
import { CardComponent } from './components/card/card.component';
import { SubscriptionComponent } from './components/subscription/subscription.component';
import { SubscriptionFormComponent } from './components/subscription-form/subscription-form.component';
import { AddChannelComponent } from './components/add-channel/add-channel.component';
import { CurrentSubscriptionComponent } from './components/current-subscription/current-subscription.component';

@NgModule({
  declarations: [
    AppComponent,
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
  imports: [
    BrowserModule,
    AppRoutingModule,
    FormsModule
  ],
  providers: [],
  bootstrap: [AppComponent]
})
export class AppModule { }
