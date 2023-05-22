import { Component, EventEmitter, Output } from '@angular/core';

@Component({
  selector: 'app-subscription',
  template: `<h3 (click)="openModal.emit()" class="flex justify-center items-center p-4">Subscribe to Base pack</h3>`,
  styleUrls: ['./subscription.component.scss']
})
export class SubscriptionComponent {
  @Output() openModal = new EventEmitter();  
}
