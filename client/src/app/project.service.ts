import { Injectable } from '@angular/core';
import { HttpClient } from '@angular/common/http';
import { Observable } from 'rxjs';

@Injectable({
  providedIn: 'root'
})
export class ProjectService {
  private apiUrl = 'http://localhost:5000/api/projects';

  constructor(private http: HttpClient) { }

  getProjects(): Observable<any> {
    return this.http.get(this.apiUrl);
  }

  addProject(project: any): Observable<any> {
    return this.http.post(this.apiUrl, project);
  }

  updateProject(id: string, project: any): Observable<any> {
    return this.http.put(`${this.apiUrl}/${id}`, project);
  }

  deleteProject(id: string): Observable<any> {
    return this.http.delete(`${this.apiUrl}/${id}`);
  }
}