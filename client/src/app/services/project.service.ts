import { Injectable } from '@angular/core';
import { HttpClient, HttpHeaders } from '@angular/common/http';
import { Observable } from 'rxjs';

@Injectable({
  providedIn: 'root'
})
export class ProjectService {
  private baseUrl = 'http://localhost:3000/api/projects';
  private urlsBaseUrl = 'http://localhost:3000/api/urls';
  private stringsBaseUrl = 'http://localhost:3000/api/strings';

  constructor(private http: HttpClient) {}

  getAllProjects(): Observable<any> {
    return this.http.get(this.baseUrl); // This will call the new route to get all projects
  }  

  getProject(id: string): Observable<any> {
    return this.http.get(`${this.baseUrl}/${id}`);
  }

  createProjectWithStrings(project: any): Observable<any> {
    return this.http.post(this.baseUrl, project);
  }

  updateProject(id: string, project: any): Observable<any> {
    return this.http.put(`${this.baseUrl}/${id}`, project);
  }

  deleteProject(id: string): Observable<any> {
    return this.http.delete(`${this.baseUrl}/${id}`);
  }

  // URL methods
  getUrls(): Observable<any> {
    return this.http.get(this.urlsBaseUrl);
  }

  createUrl(url: any): Observable<any> {
    return this.http.post(this.urlsBaseUrl, url);
  }

  updateUrl(id: string, url: any): Observable<any> {
    return this.http.put(`${this.urlsBaseUrl}/${id}`, url);
  }

  deleteUrl(id: string): Observable<any> {
    return this.http.delete(`${this.urlsBaseUrl}/${id}`);
  }

  // String methods
  getStrings(): Observable<any> {
    return this.http.get(this.stringsBaseUrl);
  }

  createString(string: any): Observable<any> {
    return this.http.post(this.stringsBaseUrl, string);
  }

  updateString(id: string, string: any): Observable<any> {
    return this.http.put(`${this.stringsBaseUrl}/${id}`, string);
  }

  deleteString(id: string): Observable<any> {
    return this.http.delete(`${this.stringsBaseUrl}/${id}`);
  }
}