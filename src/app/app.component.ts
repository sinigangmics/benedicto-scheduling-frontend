import { Component } from '@angular/core';
import { NgIf } from '@angular/common';
import { RouterLink, RouterLinkActive, RouterOutlet } from '@angular/router';

import { AccountService } from './_services';
import { User } from './_models';
import { Role } from '../app/_models/role';
import { AlertComponent } from '../app/_components/alert';

@Component({
  selector: 'app-root',
  templateUrl: 'app.component.html',
  standalone: true,
  imports: [NgIf, RouterOutlet, RouterLink, RouterLinkActive, AlertComponent],
})
export class AppComponent {
  Role = Role;
  user?: User | null;

  constructor(private accountService: AccountService) {
    this.accountService.user.subscribe((x) => (this.user = x));
  }

  logout() {
    this.accountService.logout();
  }
}
