import { AfterViewInit, Component } from '@angular/core';
import { SharedService } from '@app/shared.service';
import { schedule } from '@app/_models/schedule';

@Component({ templateUrl: 'secondEnlistment.component.html' })
export class secondEnlistmentComponent implements AfterViewInit {
  schedule: schedule[] = [];

  constructor(private sharedService: SharedService) {}

  ngAfterViewInit(): void {
    this.sharedService.getSecondSchedules().subscribe((data) => {
      this.schedule = data;
    });
  }
}
