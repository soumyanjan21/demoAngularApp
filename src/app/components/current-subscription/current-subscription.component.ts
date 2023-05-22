import { Component, Input, inject } from '@angular/core';
import { UserSubscription } from 'src/app/services/subscription.service';

@Component({
  selector: 'app-current-subscription',
  template: `<div class="current-subscription w-2/3">
    <div
      *ngIf="currentSubscription && currentSubscription?.basePack"
      class="flex gap-4 flex-col"
    >
      <span class="inline-flex w-fit">
        <p class="text-white">Current subscription is &nbsp;</p>
        <span class="text-white">{{ currentSubscription.basePack?.name }}</span>
      </span>
      <span class="inline-flex w-fit">
        <p class="text-white">
          for {{ currentSubscription.subscriptionPeriod }} months.
        </p>
      </span>
      <div *ngIf="currentSubscription.addOnChannels" class="flex">
        <p>Addon channels are &nbsp;</p>
        <p *ngFor="let ob of currentSubscription.addOnChannels | keyvalue">
          {{ ob.value.name }} &nbsp;
        </p>
      </div>
      <div *ngIf="currentSubscription.addOnChannels" class="flex">
        <p class="text-white">Addon Services are &nbsp;</p>
        <p *ngFor="let ob of currentSubscription.addOnServices | keyvalue">
          {{ ob.value.name }} &nbsp;
        </p>
      </div>
    </div>
  </div> `,
  styleUrls: ['./current-subscription.component.scss'],
})
export class CurrentSubscriptionComponent {
  @Input() currentSubscription?: UserSubscription | null;
}
