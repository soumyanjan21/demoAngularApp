import { Component } from '@angular/core';

@Component({
  selector: 'app-nav-bar',
  template: `<div
    class="inline-flex items-center bg-black w-full h-12 justify-between"
  >
    <span class="logo">SatTv</span>
    <app-logged-user></app-logged-user>
  </div>`,
  styleUrls: ['./nav-bar.component.scss'],
})
export class NavBarComponent {}
