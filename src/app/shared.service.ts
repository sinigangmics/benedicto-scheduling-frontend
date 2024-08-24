import { Injectable } from '@angular/core';

import { HttpClient, HttpHeaders } from '@angular/common/http';
import { Observable } from 'rxjs';

@Injectable({
  providedIn: 'root',
})
export class SharedService {
  readonly APIUrl = 'http://localhost:4000/schedule';

  constructor(private http: HttpClient) {}

  //^ FIRST YEAR
  addSchedule(schedule: any): Observable<any> {
    return this.http.post<any>(`${this.APIUrl}/1st-year`, schedule);
  }

  getSchedules(): Observable<any[]> {
    return this.http.get<any[]>(`${this.APIUrl}/1st-year`);
  }

  updateSchedule(id: number, schedule: any): Observable<any> {
    return this.http.put(`${this.APIUrl}/1st-year/${id}`, schedule);
  }

  deleteSchedule(id: number): Observable<void> {
    return this.http.delete<void>(`${this.APIUrl}/1st-year/${id}`);
  }

  //^ SECOND YEAR
  getSecondSchedules(): Observable<any[]> {
    return this.http.get<any[]>(`${this.APIUrl}/2nd-year`);
  }

  addSecondSchedule(schedule: any): Observable<any> {
    return this.http.post<any>(`${this.APIUrl}/2nd-year`, schedule);
  }

  updateSecondSchedule(id: number, schedule: any): Observable<any> {
    return this.http.put(`${this.APIUrl}/2nd-year/${id}`, schedule);
  }

  deleteSecondSchedule(id: number): Observable<void> {
    return this.http.delete<void>(`${this.APIUrl}/2nd-year/${id}`);
  }

  //^ THIRD YEAR
  getThirdSchedules(): Observable<any[]> {
    return this.http.get<any[]>(`${this.APIUrl}/3rd-year`);
  }

  addThirdSchedule(schedule: any): Observable<any> {
    return this.http.post<any>(`${this.APIUrl}/3rd-year`, schedule);
  }

  updateThirdSchedule(id: number, schedule: any): Observable<any> {
    return this.http.put(`${this.APIUrl}/3rd-year/${id}`, schedule);
  }

  deleteThirdSchedule(id: number): Observable<void> {
    return this.http.delete<void>(`${this.APIUrl}/3rd-year/${id}`);
  }

  //^ FOURTH YEAR

  getFourthSchedules(): Observable<any[]> {
    return this.http.get<any[]>(`${this.APIUrl}/4th-year`);
  }

  addFourthSchedule(schedule: any): Observable<any> {
    return this.http.post<any>(`${this.APIUrl}/4th-year`, schedule);
  }

  updateFourthSchedule(id: number, schedule: any): Observable<any> {
    return this.http.put(`${this.APIUrl}/4th-year/${id}`, schedule);
  }

  deleteFourthSchedule(id: number): Observable<void> {
    return this.http.delete<void>(`${this.APIUrl}/4th-year/${id}`);
  }

  // deleteSchedule(id: number): Observable<any> {
  //   return this.http.delete(`${this.APIUrl}/${id}`);
  // }
}
