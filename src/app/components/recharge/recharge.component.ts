import { Component, EventEmitter, Output, inject } from '@angular/core';
import { BalanceServiceService } from 'src/app/services/balance-service.service';

@Component({
  selector: 'app-recharge',
  template: `<div class="recharge-conatiner">
    <diV class="recharge-box flex flex-col">
      <div class="inline-flex w-full justify-end">
        <img
          class="cross"
          (click)="rechargeEvent.emit()"
          src="../../../assets/icons/round-cross.svg"
        />
      </div>
      <span class="p-4 text-white">Enter Amoumt :</span>
      <span class="pl-4 pr-4 text-white">
        Rs
        <input
          class="m-4 text-black"
          type="number"
          [ngModel]="rechargeAmount"
          (ngModelChange)="rechargeAmount = $event"
        />
      </span>
      <div class="w-full inline-flex justify-center">
        <div class="recharge-button" (click)="recharge()">
          <img src="../../../assets/icons/arrow.svg" />
        </div>
      </div>
    </diV>
  </div> `,
  styleUrls: ['./recharge.component.scss'],
})
export class RechargeComponent {
  @Output() rechargeEvent = new EventEmitter();
  balanceServcie = inject(BalanceServiceService);
  rechargeAmount: number = 100;

  recharge() {
    this.balanceServcie.addBalance(this.rechargeAmount).subscribe(() => {
      this.rechargeAmount = 0;
      this.rechargeEvent.emit();
    });
  }
}
