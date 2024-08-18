import { NgModule } from '@angular/core';
import { Routes, RouterModule } from '@angular/router';

import { ProspectusFirstComponent } from './IT/1st-year/prospectus-1st.component';
import { ProspectusSecondComponent } from './IT/2nd-year/prospectus-2nd.component';
import { ProspectusThirdComponent } from './IT/3rd-year/prospectus-3rd.component';
import { ProspectusFourthComponent } from './IT/4th-year/prospectus-4th.component';

import { LayoutComponent } from './layout.component';
import { ProspectusComponent } from './prospectus.component';

const routes: Routes = [
  {
    path: '',
    component: ProspectusComponent,
    children: [
      { path: '1st-year', component: ProspectusFirstComponent },
      { path: '2nd-year', component: ProspectusSecondComponent },
      { path: '3rd-year', component: ProspectusThirdComponent },
      { path: '4th-year', component: ProspectusFourthComponent },
      { path: '', component: LayoutComponent },
    ],
  },
];

@NgModule({
  imports: [RouterModule.forChild(routes)],
  exports: [RouterModule],
})
export class ProspectusRoutingModule {}
