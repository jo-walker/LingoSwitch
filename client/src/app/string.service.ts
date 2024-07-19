//Angular service is correctly calling the backend API.
//The service is injected into the component and used to fetch data from the backend.
import { Injectable } from '@angular/core';
import { HttpClient } from '@angular/common/http';
import { Observable } from 'rxjs';

@Injectable({
  providedIn: 'root',
})
export class StringService {
  private apiUrl = 'http://localhost:5000/api/strings';

  constructor(private http: HttpClient) {}

  // getStrings(language: string, url: string): Observable<any> {
  //   return this.http.get<any>(`${this.apiUrl}?language=${language}&url=${url}`);
  // }

  // addString(stringData: any): Observable<any> {
  //   return this.http.post<any>(this.apiUrl, stringData);
  // }

  getStrings(): Observable<any[]> {
    return this.http.get<any[]>(this.apiUrl);
  }
}