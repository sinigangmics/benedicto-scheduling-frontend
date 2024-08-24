import { AfterViewInit, Component } from '@angular/core';
import { SharedService } from '@app/shared.service';
import { schedule } from '@app/_models/schedule';

@Component({ templateUrl: 'fourthEnlistment.component.html' })
export class fourthEnlistmentComponent implements AfterViewInit {
  schedule: schedule[] = [];

  constructor(private sharedService: SharedService) {}

  ngAfterViewInit(): void {
    this.sharedService.getFourthSchedules().subscribe((data) => {
      this.schedule = data;
    });
  }
}
