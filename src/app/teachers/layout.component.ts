import { Component, OnInit } from '@angular/core';
import { TeacherService } from '../_services/teacher.service';
import { Teachers } from '../_models/teachers';

import { first } from 'rxjs/operators';

@Component({ templateUrl: 'layout.component.html' })
export class LayoutComponent implements OnInit {
  teachers: Teachers[] = [];
  loading = false;
  id?: string;

  constructor(private teacherService: TeacherService) {}

  ngOnInit() {
    this.teacherService
      .getAll()
      .pipe(first())
      .subscribe((teachers) => (this.teachers = teachers));
  }
}
