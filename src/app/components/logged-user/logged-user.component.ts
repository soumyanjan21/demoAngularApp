import { Component } from '@angular/core';

@Component({
  selector: 'app-logged-user',
  template: `<div
    class="inline-flex gap-2 justify-center items-center p-2 logged-user"
  >
    <img class="h-8 w-8" src="../../../assets/icons/avatar.svg" />
    <span class="text-white"> Test User</span>
  </div>`,
  styleUrls: ['./logged-user.component.scss'],
})
export class LoggedUserComponent {}
