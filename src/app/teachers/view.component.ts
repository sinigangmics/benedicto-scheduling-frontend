import { Component, OnInit } from '@angular/core';
import { TeacherService } from '../_services/teacher.service';
import { Teachers } from '../_models/teachers';
import { ActivatedRoute } from '@angular/router';
import { first } from 'rxjs/operators';

@Component({ templateUrl: 'view.component.html' })
export class ViewComponent implements OnInit {
  teacher?: Teachers;
  loading = false;
  id?: string;

  constructor(
    private teacherService: TeacherService,
    private route: ActivatedRoute
  ) {}

  ngOnInit() {
    // Get the id from the route parameters
    this.route.params.subscribe((params) => {
      this.id = params['id'];

      if (this.id) {
        this.loading = true;
        // Fetch the teacher by ID
        this.teacherService
          .getById(this.id)
          .pipe(first())
          .subscribe(
            (teacher) => {
              this.teacher = teacher;
              this.loading = false;
            },
            (error) => {
              console.error('Error fetching teacher:', error);
              this.loading = false;
            }
          );
      }
    });
  }
}
