import { Injectable } from '@angular/core';
import { HttpClient } from '@angular/common/http';
import { Observable } from 'rxjs';

@Injectable({
  providedIn: 'root'
})
export class UrlService {
  private baseUrl = 'http://localhost:3000/api/urls';
  // private baseUrl = 'https://izga2lsgsd.execute-api.us-east-2.amazonaws.com/dev/urls'; // API Gateway URL

  constructor(private http: HttpClient) {}

  getUrlsByProjectId(projectId: string): Observable<any[]> {
    return this.http.get<any[]>(`${this.baseUrl}?projectId=${projectId}`);
  }

  getUrl(id: string): Observable<any> {
    return this.http.get(`${this.baseUrl}/${id}`);
  }

  createUrl(url: any): Observable<any> {
    return this.http.post(this.baseUrl, url);
  }

  updateUrl(id: string, url: any): Observable<any> {
    return this.http.put(`${this.baseUrl}/${id}`, url);
  }

  deleteUrl(id: string): Observable<any> {
    return this.http.delete(`${this.baseUrl}/${id}`);
  }

  getAllUrls(): Observable<any[]> {
    return this.http.get<any[]>(`${this.baseUrl}`);
  }
}
