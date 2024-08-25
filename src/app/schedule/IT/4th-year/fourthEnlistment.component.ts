import { AfterViewInit, Component } from '@angular/core';
import { SharedService } from '@app/shared.service';
import { schedule } from '@app/_models/schedule';
import { DatePipe } from '@angular/common';

@Component({
  templateUrl: 'fourthEnlistment.component.html',
  providers: [DatePipe], // Add DatePipe to providers
})
export class fourthEnlistmentComponent implements AfterViewInit {
  schedule: schedule[] = [];

  constructor(
    private sharedService: SharedService,
    private datePipe: DatePipe
  ) {}

  ngAfterViewInit(): void {
    this.sharedService.getFourthSchedules().subscribe((data) => {
      this.schedule = data.map((item) => {
        // Convert start and end to Date objects and format to AM/PM
        item.start = this.datePipe.transform(new Date(item.start), 'h:mm a');
        item.end = this.datePipe.transform(new Date(item.end), 'h:mm a');
        return item;
      });
    });
  }
}
