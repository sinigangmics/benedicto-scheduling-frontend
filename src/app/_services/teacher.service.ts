import { Injectable } from '@angular/core';
import { Router } from '@angular/router';
import { HttpClient } from '@angular/common/http';
import { BehaviorSubject, Observable } from 'rxjs';
import { map, finalize } from 'rxjs/operators';

// import { environment } from '@environments/environment';
import { environment } from '../environments/environment';
import { Teachers } from '../_models/teachers';

const baseUrl = `${environment.apiUrl}/teachers`;

@Injectable({ providedIn: 'root' })
export class TeacherService {
  private teacherSubject: BehaviorSubject<Teachers | null>;
  public teachers: Observable<Teachers | null>;

  constructor(private router: Router, private http: HttpClient) {
    this.teacherSubject = new BehaviorSubject<Teachers | null>(null);
    this.teachers = this.teacherSubject.asObservable();
  }

  public get teacherValue(): Teachers | null {
    return this.teacherSubject.value;
  }

  getAll() {
    return this.http.get<Teachers[]>(`${baseUrl}/all-teachers`);
  }

  getById(id: string) {
    return this.http.get<Teachers>(`${baseUrl}/${id}`);
  }

  createTeacher(teacher: Teachers) {
    return this.http.post(`${baseUrl}/add-teacher`, teacher);
  }

  update(id: string, params: any): Observable<Teachers> {
    return this.http
      .put<Teachers>(`${baseUrl}/edit-teacher/${id}`, params)
      .pipe(
        map((updatedTeacher: Teachers) => {
          // Check if teacherValue is not null before accessing it
          if (this.teacherValue && updatedTeacher.id === this.teacherValue.id) {
            // Publish updated teacher to subscribers
            const teacher = { ...this.teacherValue, ...updatedTeacher };
            this.teacherSubject.next(teacher);
          }
          return updatedTeacher;
        })
      );
  }

  delete(id: string) {
    return this.http.delete(`${baseUrl}/delete-teacher/${id}`).pipe(
      finalize(() => {
        // Clear the current teacher if the deleted teacher was the current teacher
        if (this.teacherValue && id === this.teacherValue.id) {
          this.teacherSubject.next(null); // Clear the current teacher
          this.router.navigate(['/teachers']); // Redirect to the teachers list or any other appropriate route
        }
      })
    );
  }

  getTeacherSchedules(teacherId: number): Observable<any[]> {
    return this.http.get<any[]>(`${baseUrl}/schedules/${teacherId}`);
  }
}
