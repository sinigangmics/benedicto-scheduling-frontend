import { Component } from '@angular/core';

import { User } from '@app/_models';
import { AccountService } from '@app/_services';

@Component({
  templateUrl: 'home.component.html',
  standalone: true,
  imports: [],
})
export class HomeComponent {
  user?: User | null;

  constructor(private accountService: AccountService) {
    this.user = this.accountService.userValue;
    this.test();
  }

  test() {
    console.log('HomeComponent...');
  }
}
