import { NgModule } from '@angular/core';
import { Routes, RouterModule } from '@angular/router';

// import { ProspectusFirstComponent } from './IT/1st-year/prospectus-1st.component';
// import { ProspectusSecondComponent } from './IT/2nd-year/prospectus-2nd.component';
// import { ProspectusThirdComponent } from './IT/3rd-year/prospectus-3rd.component';
// import { ProspectusFourthComponent } from './IT/4th-year/prospectus-4th.component';

import { firstSchedComponent } from './IT/1st-year/firstSched.component';
import { secondSchedComponent } from './IT/2nd-year/secondSched.component';
import { thirdSchedComponent } from './IT/3rd-year/thirdSched.component';

import { firstEnlistmentComponent } from './IT/1st-year/firstEnlistment.component';
import { secondEnlistmentComponent } from './IT/2nd-year/secondEnlistment.component';
import { thirdEnlistmentComponent } from './IT/3rd-year/thirdEnlistment.component';

import { LayoutComponent } from './layout.component';
import { ScheduleComponent } from './schedule.component';

const routes: Routes = [
  {
    path: '',
    component: ScheduleComponent,
    children: [
      { path: '1st-year/schedule', component: firstSchedComponent },
      { path: '1st-year/enlistment', component: firstEnlistmentComponent },
      { path: '2nd-year/schedule', component: secondSchedComponent },
      { path: '2nd-year/enlistment', component: secondEnlistmentComponent },
      { path: '3rd-year/schedule', component: thirdSchedComponent },
      { path: '3rd-year/enlistment', component: thirdEnlistmentComponent },
      // { path: '4th-year', component: ProspectusFourthComponent },
      { path: '', component: LayoutComponent },
    ],
  },
];

@NgModule({
  imports: [RouterModule.forChild(routes)],
  exports: [RouterModule],
})
export class ProspectusRoutingModule {}
