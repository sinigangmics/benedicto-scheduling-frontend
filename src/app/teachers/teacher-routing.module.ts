import { NgModule } from '@angular/core';
import { Routes, RouterModule } from '@angular/router';

import { AddComponent } from './add.component';
import { ViewComponent } from './view.component';
import { LayoutComponent } from './layout.component';
import { TeacherRoutingComponent } from './teacher.component';

const routes: Routes = [
  {
    path: '',
    component: TeacherRoutingComponent,
    children: [
      { path: 'add', component: AddComponent },
      { path: 'edit/:id', component: AddComponent },
      { path: 'view/:id', component: ViewComponent },
      { path: '', component: LayoutComponent },
    ],
  },
];

@NgModule({
  imports: [RouterModule.forChild(routes)],
  exports: [RouterModule],
})
export class TeacherRoutingModule {}
