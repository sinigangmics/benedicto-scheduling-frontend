import { NgModule } from '@angular/core';
import { ReactiveFormsModule } from '@angular/forms';
import { CommonModule } from '@angular/common';

import { ProspectusFirstComponent } from './IT/1st-year/prospectus-1st.component';
import { ProspectusSecondComponent } from './IT/2nd-year/prospectus-2nd.component';
import { ProspectusThirdComponent } from './IT/3rd-year/prospectus-3rd.component';
import { ProspectusFourthComponent } from './IT/4th-year/prospectus-4th.component';

import { LayoutComponent } from './layout.component';
import { ProspectusRoutingModule } from './prospectus.routing.module';
import { ProspectusComponent } from './prospectus.component';

@NgModule({
  imports: [CommonModule, ReactiveFormsModule, ProspectusRoutingModule],
  declarations: [
    ProspectusFirstComponent,
    ProspectusSecondComponent,
    ProspectusThirdComponent,
    ProspectusFourthComponent,
    LayoutComponent,
    ProspectusComponent,
  ],
})
export class prospectusModule {}
