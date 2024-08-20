import { Injectable } from '@angular/core';
import { jqxSchedulerComponent } from 'jqwidgets-ng/jqxscheduler';
import { HttpClient, HttpHeaders } from '@angular/common/http';
import { Observable } from 'rxjs';

@Injectable({
  providedIn: 'root',
})
export class SharedService {
  scheduler!: jqxSchedulerComponent; // Define the type of scheduler if possible

  closeDialogOnNavClick = () => {
    if (this.scheduler) {
      this.scheduler.closeDialog();
    }
  };

  readonly APIUrl = 'http://localhost:4000/schedule';

  constructor(private http: HttpClient) {}

  getSchedules(): Observable<any[]> {
    return this.http.get<any[]>(`${this.APIUrl}/1st-year`);
  }

  getSecondSchedules(): Observable<any[]> {
    return this.http.get<any[]>(`${this.APIUrl}/2nd-year`);
  }

  getThirdSchedules(): Observable<any[]> {
    return this.http.get<any[]>(`${this.APIUrl}/3rd-year`);
  }

  addSchedule(schedule: any): Observable<any> {
    const headers = new HttpHeaders({ 'Content-Type': 'application/json' });
    return this.http.post<any>(`${this.APIUrl}/1st-year`, schedule, {
      headers,
    });
  }

  addSecondSchedule(schedule: any): Observable<any> {
    return this.http.post<any>(`${this.APIUrl}/2nd-year`, schedule);
  }

  addThirdSchedule(schedule: any): Observable<any> {
    return this.http.post<any>(`${this.APIUrl}/3rd-year`, schedule);
  }

  // updateSchedule(id: number, schedule: any): Observable<any> {
  //   return this.http.put(`${this.APIUrl}/${id}`, schedule);
  // }

  // deleteSchedule(id: number): Observable<any> {
  //   return this.http.delete(`${this.APIUrl}/${id}`);
  // }
}
