import {
  Component,
  EventEmitter,
  OnDestroy,
  OnInit,
  Output,
  inject,
} from '@angular/core';
import { catchError, mergeMap, throwError } from 'rxjs';
import { BalanceServiceService } from 'src/app/services/balance-service.service';
import { DataService } from 'src/app/services/data.service';
import { SubscriptionService } from 'src/app/services/subscription.service';
import { FormGroup, FormControl, Validators } from '@angular/forms';

@Component({
  selector: 'app-subscription-form',
  template: `<div class="subscription-form-conatiner">
    <diV class="subscription-box p-4 flex flex-col">
      <div class="inline-flex w-full justify-end">
        <img
          class="cross"
          (click)="closeModal.emit()"
          src="../../../assets/icons/round-cross.svg"
        />
      </div>
      <h3 class="text-white text-3xl">Subscribe to channel packs</h3>
      <form class="w-full flex flex-col" [formGroup]="subscriptionForm">
        <span class="w-full inline-flex"
          ><label class="flex text-white w-1/3 items-center" for="duration"
            >Enter the Pack you wish to subscribe:</label
          >
          <select
            class="pt-0 w-1/2"
            style="width: 18rem; height: 2rem"
            formControlName="basePackKey"
          >
            <option *ngFor="let key of keys" [value]="key">
              {{ basepacks[key].name }}
            </option>
          </select>
        </span>
        <span class="w-full inline-flex"
          ><label class="text-white w-1/3 flex items-center" for="duration"
            >Enter the months:</label
          >
          <input
            class="w-1/2"
            style="width: 18rem; height: 2rem"
            type="number"
            formControlName="duration"
        /></span>
        <span
          class="text-red-400"
          *ngIf="
            subscriptionForm.controls['duration'].touched &&
            subscriptionForm.controls['duration'].errors &&
            subscriptionForm.controls['duration'].errors['min']
          "
          >*Number of months should be greater than zero</span
        >
      </form>
      <div class="inline-flex gap-2 justify-center items-center mt-4"></div>
      <span class="underline text-white w-full h-0"></span>
      <div class="text-white flex flex-col justify-start">
        <p>Subscription Amount: {{ subscriptionDetails.subsAmout }} Rs.</p>
        <p>Discount applied: {{ subscriptionDetails.discountApplied }} Rs.</p>
        <p>
          Final Price after discount: {{ subscriptionDetails.finalPrice }} Rs.
        </p>
        <p *ngIf="error" class="text-red-400">*{{ error }}</p>
      </div>
      <div class="w-full inline-flex justify-center mt-12">
        <button
          [disabled]="subscriptionForm.status === 'INVALID'"
          [class.disabled]="subscriptionForm.status === 'INVALID'"
          class="subscription-button"
          (click)="submit()"
        >
          <img src="../../../assets/icons/arrow.svg" />
        </button>
      </div>
    </diV>
  </div> `,
  styleUrls: ['./subscription-form.component.scss'],
})
export class SubscriptionFormComponent implements OnDestroy, OnInit {
  @Output() closeModal = new EventEmitter();

  dataService = inject(DataService);
  subscriptionService = inject(SubscriptionService);
  balanceService = inject(BalanceServiceService);
  basepacks: Record<string, any> = {};
  keys: string[] = [];
  basePackKey: string = 'silverPack';
  duration?: number;
  error?: string;
  subscriptionDetails = {
    subsAmout: 0,
    discountApplied: 0,
    finalPrice: 0,
  };
  subscriptionForm!: FormGroup;

  ngOnInit(): void {
    this.dataService
    .getBasePacks()
    .pipe(
      mergeMap((data) => {
        this.basepacks = data;
        this.keys = Object.keys(data);
        this.subscriptionForm = new FormGroup({
          basePackKey: new FormControl(this.keys[0]),
          duration: new FormControl(0, [Validators.min(1)]),
        });
        return this.subscriptionForm.valueChanges;
      })
    )
    .subscribe((changes) => this.handleAmountChnage(changes));
  }

  submit() {
    if (this.subscriptionForm.status === 'VALID')
      this.balanceService
      .reduceBalance(this.subscriptionDetails.finalPrice)
      .pipe(
        mergeMap(() => {
          return this.subscriptionService.addBasepack(
            this.basepacks[this.subscriptionForm.value.basePackKey],
            this.subscriptionForm.value.duration
          );
        }),
        catchError((err) => throwError(() => err))
      )
      .subscribe({
        next: () => {
          this.closeModal.emit();
        },
        error: (err) => (this.error = err.message),
      })
      .unsubscribe();
  }

  handleAmountChnage(changes: { basePackKey: string; duration: number }) {
    this.subscriptionDetails.subsAmout =
      this.basepacks[changes.basePackKey].price * changes.duration;
    this.subscriptionDetails.discountApplied =
      changes.duration >= 3 ? this.subscriptionDetails.subsAmout * 0.1 : 0;
    this.subscriptionDetails.finalPrice =
      this.subscriptionDetails.subsAmout -
      this.subscriptionDetails.discountApplied;
  }

  ngOnDestroy(): void {
    this.basepacks = {};
    this.keys = [];
    this.basePackKey = 'silverPack';
    this.duration = undefined;
    this.error = undefined;
    this.subscriptionDetails = {
      subsAmout: 0,
      discountApplied: 0,
      finalPrice: 0,
    };
  }
}
