import { Injectable } from '@angular/core';
import { HttpClient } from '@angular/common/http';
import { Observable } from 'rxjs';

@Injectable({
  providedIn: 'root'
})
export class StringService {
  private baseUrl = 'http://localhost:5000/api/strings'; 

  constructor(private http: HttpClient) {}

  getString(key: string): Observable<any> {
    return this.http.get(`${this.baseUrl}/${key}`);
  }

  createString(key: string, values: { [key: string]: string }, urls: string[]): Observable<any> {
    return this.http.post(this.baseUrl, { key, values, urls });
  }

  updateString(key: string, values: { [key: string]: string }, urls: string[]): Observable<any> {
    return this.http.put(`${this.baseUrl}/${key}`, { values, urls });
  }

  deleteString(key: string): Observable<any> {
    return this.http.delete(`${this.baseUrl}/${key}`);
  }

  getStringsByUrl(url: string): Observable<any> {
    return this.http.get(`${this.baseUrl}/by-url?url=${url}`);
  }
}