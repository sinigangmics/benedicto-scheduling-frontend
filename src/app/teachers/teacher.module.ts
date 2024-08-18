import { NgModule } from '@angular/core';
import { ReactiveFormsModule } from '@angular/forms';
import { CommonModule } from '@angular/common';

import { TeacherRoutingModule } from './teacher-routing.module';
import { LayoutComponent } from './layout.component';
import { AddComponent } from './add.component';
import { TeacherRoutingComponent } from './teacher.component';
@NgModule({
  imports: [CommonModule, ReactiveFormsModule, TeacherRoutingModule],
  declarations: [TeacherRoutingComponent, AddComponent, LayoutComponent],
})
export class TeacherModule {}
