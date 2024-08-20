import { NgModule } from '@angular/core';
import { ReactiveFormsModule } from '@angular/forms';
import { CommonModule } from '@angular/common';
import { jqxSchedulerModule } from 'jqwidgets-ng/jqxscheduler';

import { LayoutComponent } from './layout.component';
import { ProspectusRoutingModule } from './schedule.routing.module';
import { ScheduleComponent } from './schedule.component';

// SCHEDULE
import { firstSchedComponent } from './IT/1st-year/firstSched.component';
import { secondSchedComponent } from './IT/2nd-year/secondSched.component';
import { thirdSchedComponent } from './IT/3rd-year/thirdSched.component';

// ENLISTMENT
import { firstEnlistmentComponent } from './IT/1st-year/firstEnlistment.component';
import { secondEnlistmentComponent } from './IT/2nd-year/secondEnlistment.component';
import { thirdEnlistmentComponent } from './IT/3rd-year/thirdEnlistment.component';

@NgModule({
  imports: [
    CommonModule,
    ReactiveFormsModule,
    ProspectusRoutingModule,
    jqxSchedulerModule,
  ],
  declarations: [
    // SCHED
    firstSchedComponent,
    secondSchedComponent,
    thirdSchedComponent,

    // ENLISTMENT
    firstEnlistmentComponent,
    secondEnlistmentComponent,
    thirdEnlistmentComponent,

    LayoutComponent,
    ScheduleComponent,
  ],
})
export class scheduleModule {}
