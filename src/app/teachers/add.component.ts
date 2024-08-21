import { Component, OnInit } from '@angular/core';
import { Router, ActivatedRoute } from '@angular/router';
import {
  UntypedFormBuilder,
  UntypedFormGroup,
  Validators,
} from '@angular/forms';
import { first } from 'rxjs/operators';

import { AlertService } from '../_services';
import { TeacherService } from '../_services/teacher.service';
// import { MustMatch } from '../_helpers';

@Component({ templateUrl: 'add.component.html' })
export class AddComponent implements OnInit {
  form!: UntypedFormGroup;
  id!: string;
  isAddMode!: boolean;
  loading = false;
  submitted = false;
  isEditPage = false;

  constructor(
    private formBuilder: UntypedFormBuilder,
    private route: ActivatedRoute,
    private router: Router,
    private teacherService: TeacherService,
    private alertService: AlertService
  ) {}

  ngOnInit() {
    this.id = this.route.snapshot.params['id'];
    this.isAddMode = !this.id;

    this.form = this.formBuilder.group({
      // title: ['', Validators.required],
      firstName: ['', Validators.required],
      lastName: ['', Validators.required],
      address: ['', Validators.required],
      phoneNumber: ['', Validators.required],
      email: ['', [Validators.required, Validators.email]],
    });

    if (!this.isAddMode) {
      this.teacherService
        .getById(this.id)
        .pipe(first())
        .subscribe((x) => this.form.patchValue(x));
    }
    this.checkIfEditPage();
  }

  // convenience getter for easy access to form fields
  get f() {
    return this.form.controls;
  }

  checkIfEditPage() {
    // Check if the current URL matches the edit page pattern
    const url = this.router.url;
    this.isEditPage = url.startsWith(`/teachers/edit`);
  }

  onSubmit() {
    this.submitted = true;

    // reset alerts on submit
    this.alertService.clear();

    // stop here if form is invalid
    if (this.form.invalid) {
      return;
    }

    this.loading = true;
    if (this.isAddMode) {
      this.createAccount();
    } else {
      this.updateAccount();
    }
  }

  private createAccount() {
    this.teacherService
      .createTeacher(this.form.value)
      .pipe(first())
      .subscribe({
        next: () => {
          this.alertService.success('Teacher created successfully', {
            keepAfterRouteChange: true,
          });

          this.router.navigate(['../'], { relativeTo: this.route });
        },
        error: (error) => {
          this.alertService.error('Teacher created failed', {
            keepAfterRouteChange: true,
            error,
          });
          this.loading = false;
        },
      });
  }

  private updateAccount() {
    this.teacherService
      .update(this.id, this.form.value)
      .pipe(first())
      .subscribe({
        next: () => {
          this.alertService.success('Update successful', {
            keepAfterRouteChange: true,
          });
          this.router.navigate(['../../'], { relativeTo: this.route });
        },
        error: (error) => {
          this.alertService.error('Update failed', {
            keepAfterRouteChange: true,
            error,
          });
          this.loading = false;
        },
      });
  }

  onDelete() {
    if (confirm('Are you sure you want to delete this teacher?')) {
      this.loading = true;
      this.teacherService.delete(this.id).subscribe({
        next: () => {
          this.alertService.success('Delete successful', {
            keepAfterRouteChange: true,
          });
          this.loading = false;
          this.router.navigate(['/teachers']);
        },
        error: (err) => {
          console.error('Error deleting teacher:', err);
          this.loading = false;
        },
      });
    }
  }
}
