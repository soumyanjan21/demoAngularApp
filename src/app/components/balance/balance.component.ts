import { Component, Input } from '@angular/core';

@Component({
  selector: 'app-balance',
  template: `<div class="balance flex flex-col w-fit h-fit p-4">
    <p>Current balance is</p>
    <span>Rs {{ balance }}</span>
  </div> `,
  styleUrls: ['./balance.component.scss'],
})
export class BalanceComponent {
  @Input() balance: number | null = 0;
}
