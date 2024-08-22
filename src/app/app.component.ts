import { Component } from '@angular/core';
import { NgIf } from '@angular/common';
import { RouterLink, RouterLinkActive, RouterOutlet } from '@angular/router';

import { AccountService } from './_services';
import { User } from './_models';
import { Role } from '../app/_models/role';
import { AlertComponent } from './_components/alert';
import { AlertService } from './_services';
// import { SharedService } from 'src/app/shared.service';
import { jqxSchedulerComponent } from 'jqwidgets-ng/jqxscheduler';

@Component({
  selector: 'app-root',
  templateUrl: 'app.component.html',
  standalone: true,
  imports: [NgIf, RouterOutlet, RouterLink, RouterLinkActive, AlertComponent],
})
export class AppComponent {
  scheduler!: jqxSchedulerComponent;
  Role = Role;
  user?: User | null;

  constructor(
    private accountService: AccountService,

    private alertService: AlertService
  ) {
    this.accountService.user.subscribe((x) => (this.user = x));
  }

  // Define the type of scheduler if possible

  closeDialogOnNavClick = () => {
    if (this.scheduler) {
      this.scheduler.closeDialog();
    }
  };

  logout() {
    this.accountService.logout();
    this.alertService.info('Logout successfully', {
      keepAfterRouteChange: true,
    });
  }
}
