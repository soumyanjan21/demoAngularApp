import {
  Component,
  EventEmitter,
  Input,
  OnChanges,
  Output,
  SimpleChanges,
  inject,
} from '@angular/core';
import { forkJoin, mergeMap, catchError, throwError } from 'rxjs';
import { BalanceServiceService } from 'src/app/services/balance-service.service';
import { channel, service } from 'src/app/services/data.service';
import {
  SubscriptionService,
  UserSubscription,
} from 'src/app/services/subscription.service';

@Component({
  selector: 'app-add-channel',
  template: `<div class="subscription-form-conatiner">
    <diV class="subscription-box p-4 flex flex-col">
      <div class="inline-flex w-full justify-end">
        <img
          class="cross"
          (click)="closeModal.emit()"
          src="../../../assets/icons/round-cross.svg"
        />
      </div>
      <h3 class="text-white text-3xl">
        Add channels and services to existing subscription
      </h3>
      <diV class="flex flex-col items-start">
        <div
          *ngFor="let propKey of [channelKeys, serviceKeys]; let i = index"
          class="inline-flex gap-2 justify-center items-start mt-4 mb-2"
        >
          <span class="p-4 text-white">Select channel to add</span>
          <div class="flex flex-col items-start">
            <div
              *ngFor="let key of propKey"
              class="inline-flex justify-center items-center gap-2"
            >
              <input
                type="checkbox"
                class="p-2"
                [value]="key"
                [checked]="
                  this.services && i === 0
                    ? this.channels && this.channels[key].selected
                    : this.services && this.services[key].selected
                "
                (change)="handleAmountChnage(key, i)"
              />
              {{
                i === 0
                  ? this.channels && this.channels[key].name
                  : this.services && this.services[key].name
              }}
            </div>
          </div>
        </div>
      </diV>
      <span class="underline text-white w-full h-0"></span>
      <div class="text-white flex flex-col justify-start">
        <p>Total Amount: {{ totalPrice }} Rs.</p>
        <p class="text-red-400">*{{ error }}</p>
      </div>
      <div class="w-full inline-flex justify-center mt-2">
        <div class="subscription-button" (click)="submit()">
          <img src="../../../assets/icons/arrow.svg" />
        </div>
      </div>
    </diV>
  </div> `,
  styleUrls: ['./add-channel.component.scss'],
})
export class AddChannelComponent implements OnChanges {
  @Input() channels: Record<string, channel & { selected?: boolean }> | null =
    {};
  @Input() services: Record<string, service & { selected?: boolean }> | null =
    {};
  @Input() subscriptionDetails: UserSubscription | null = {};
  @Output() closeModal = new EventEmitter();

  subscriptionService = inject(SubscriptionService);
  balanceService = inject(BalanceServiceService);
  channelKeys: string[] = [];
  serviceKeys: string[] = [];
  error?: string;
  totalPrice = 0;

  ngOnChanges(changes: SimpleChanges): void {
    this.channelKeys = Object.keys(this.channels || {}).filter(
      (key) =>
        !this.subscriptionDetails?.basePack?.channels[key] &&
        !(
          this.subscriptionDetails?.addOnChannels &&
          this.subscriptionDetails?.addOnChannels[key]
        )
    );
    this.serviceKeys = Object.keys(this.services || {}).filter(
      (key) =>
        !this.subscriptionDetails?.addOnServices ||
        !this.subscriptionDetails?.addOnServices[key]
    );
  }

  submit() {
    if (this.totalPrice > 0)
      this.balanceService
      .reduceBalance(this.totalPrice)
      .pipe(
        mergeMap(() =>
          forkJoin([
            this.subscriptionService.addChannel(
              this.getSelecetdObjects(this.channels || {})
            ),
            this.subscriptionService.addService(
              this.getSelecetdObjects(this.services || {})
            ),
          ])
        ),
        catchError((err) => throwError(() => err))
      )
      .subscribe({
        next: (data) => {
          console.log('modal is working', data);
          this.closeModal.emit();
        },
        error: (err) => (this.error = err.message),
      })
      .unsubscribe();
  }

  getSelecetdObjects(obj: Record<string, { selected?: boolean }>) {
    return Object.keys(obj).reduce((acc, key) => {
      if (obj[key].selected) acc[key] = obj[key];
      return acc;
    }, {} as Record<string, any>);
  }

  handleAmountChnage(key: string, prokey: number) {
    if (prokey === 0 && this.channels) {
      this.channels[key].selected = !this.channels[key].selected;
      this.totalPrice = this.channels[key].selected
        ? this.totalPrice + this.channels[key].price
        : this.totalPrice - this.channels[key].price;
    } else if (this.services) {
      this.services[key].selected = this.services[key].selected;
      this.services[key].selected = !this.services[key].selected;
      this.totalPrice = this.services[key].selected
        ? this.totalPrice + this.services[key].price
        : this.totalPrice - this.services[key].price;
    }
  }

  ngOnDestroy(): void {
    this.channelKeys = [];
    this.serviceKeys = [];
    this.error = undefined;
    this.totalPrice = 0;
    this.channels = {};
    this.services = {};
  }
}
