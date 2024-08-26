import { Component, OnInit } from '@angular/core';
import { TeacherService } from '../_services/teacher.service';
import { Teachers } from '../_models/teachers';
import { ActivatedRoute } from '@angular/router';
import { first } from 'rxjs/operators';
import { DatePipe } from '@angular/common';

@Component({ templateUrl: 'view.component.html', providers: [DatePipe] })
export class ViewComponent implements OnInit {
  teacher?: Teachers;
  loading = false;
  id?: string;

  schedules: any[] = [];
  teacherId?: number;

  constructor(
    private teacherService: TeacherService,
    private route: ActivatedRoute,
    private datePipe: DatePipe
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

    this.route.paramMap.subscribe((params) => {
      const id = params.get('id');
      if (id) {
        this.teacherId = +id; // Convert to number
        this.loadTeacherSchedules(this.teacherId);
      }
    });
  }

  loadTeacherSchedules(teacherId: number): void {
    this.teacherService
      .getTeacherSchedules(teacherId)
      .subscribe((data: any[]) => {
        // Adjust type as needed
        this.schedules = data.map((item) => {
          // Convert start and end to Date objects and format to AM/PM
          item.start = this.datePipe.transform(new Date(item.start), 'h:mm a');
          item.end = this.datePipe.transform(new Date(item.end), 'h:mm a');
          return item;
        });
      });
  }
}
