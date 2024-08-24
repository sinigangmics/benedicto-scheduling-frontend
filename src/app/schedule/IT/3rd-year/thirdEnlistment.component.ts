import { AfterViewInit, Component } from '@angular/core';
import { SharedService } from '@app/shared.service';
import { schedule } from '@app/_models/schedule';

@Component({ templateUrl: 'thirdEnlistment.component.html' })
export class thirdEnlistmentComponent implements AfterViewInit {
  schedule: schedule[] = [];

  constructor(private sharedService: SharedService) {}

  ngAfterViewInit(): void {
    this.sharedService.getThirdSchedules().subscribe((data) => {
      this.schedule = data;
    });
  }
}
