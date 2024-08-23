import { Injectable } from '@angular/core';

import { HttpClient, HttpHeaders } from '@angular/common/http';
import { Observable } from 'rxjs';

@Injectable({
  providedIn: 'root',
})
export class SharedService {
  readonly APIUrl = 'http://localhost:4000/schedule';

  constructor(private http: HttpClient) {}

  // FIRST YEAR
  getSchedules(): Observable<any[]> {
    return this.http.get<any[]>(`${this.APIUrl}/1st-year`);
  }

  updateSchedule(id: number, schedule: any): Observable<any> {
    return this.http.put(`${this.APIUrl}/1st-year/${id}`, schedule);
  }

  deleteSchedule(id: number): Observable<void> {
    return this.http.delete<void>(`${this.APIUrl}/1st-year/${id}`);
  }

  // SECOND YEAR
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

  // deleteSchedule(id: number): Observable<any> {
  //   return this.http.delete(`${this.APIUrl}/${id}`);
  // }
}
