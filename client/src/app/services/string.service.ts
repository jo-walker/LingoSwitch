import { Injectable } from '@angular/core';
import { HttpClient, HttpHeaders } from '@angular/common/http';
import { Observable } from 'rxjs';

@Injectable({
  providedIn: 'root'
})
export class StringService {
  private baseUrl = 'http://localhost:5000/api/strings';

  constructor(private http: HttpClient) {}

  getStringsByProjectId(projectId: string): Observable<any> {
    return this.http.get(`${this.baseUrl}/by-project/${projectId}`);
  }

  getString(id: string): Observable<any> {
    return this.http.get(`${this.baseUrl}/${id}`);
  }

  createString(string: any): Observable<any> {
    return this.http.post(this.baseUrl, string);
  }

  updateString(id: string, string: any): Observable<any> {
    return this.http.put(`${this.baseUrl}/${id}`, string);
  }

  deleteString(id: string): Observable<any> {
    return this.http.delete(`${this.baseUrl}/${id}`);
  }
}