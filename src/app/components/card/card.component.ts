import { Component, Input, OnChanges } from '@angular/core';
import { BasePack, channel, service } from 'src/app/services/data.service';

@Component({
  selector: 'app-card',
  template: `<div class="flex flex-col">
    <h3 class="tittle">{{ tittle }}</h3>
    <div class="flex flex-row gap-4">
      <div *ngFor="let key of keys" class="card">
        <h3>{{ infoObject ? infoObject[key]['name'] : '' }}</h3>
        <img
          *ngIf="infoObject && infoObject[key]['icon']"
          class="icons"
          [src]="'../../../assets/icons/' + infoObject[key]['icon'] + '.svg'"
        />
        <div
          *ngIf="infoObject && infoObject[key]['channels']"
          class="flex flex-row gap-2"
        >
          <div
            class="channels"
            *ngFor="let channel of infoObject[key]['channels'] | keyvalue"
          >
            <h3>{{ channel.value.name }}</h3>
            <img
              class="icons"
              [src]="'../../../assets/icons/' + channel.value.icon + '.svg'"
            />
          </div>
        </div>
        <span class="price"
          >Rs {{ infoObject ? infoObject[key]['price'] : '' }}</span
        >
      </div>
    </div>
  </div> `,
  styleUrls: ['./card.component.scss'],
})
export class CardComponent implements OnChanges {
  @Input() infoObject?: Record<string, channel | BasePack | service> | null;
  @Input() tittle: string = '';

  keys: string[] = [];
  ngOnChanges(): void {
    this.keys = Object.keys(this.infoObject || {});
  }
}
