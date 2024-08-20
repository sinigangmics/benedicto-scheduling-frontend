import { AfterViewInit, Component } from '@angular/core';
import { SharedService } from '@app/shared.service';
import { schedule } from '@app/_models/schedule';

@Component({ templateUrl: 'firstEnlistment.component.html' })
export class firstEnlistmentComponent implements AfterViewInit {
  schedule: schedule[] = [];

  constructor(private sharedService: SharedService) {}

  ngAfterViewInit(): void {
    this.sharedService.getSchedules().subscribe((data) => {
      this.schedule = data;
    });
  }
}
