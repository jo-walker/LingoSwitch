import { Injectable } from '@angular/core';
import { HttpClient, HttpHeaders } from '@angular/common/http';
import { Observable } from 'rxjs';
import { AuthService } from './auth.service';

@Injectable({
  providedIn: 'root'
})
export class ProjectService {
  private baseUrl = 'http://localhost:3000/api/projects';
  // private baseUrl = 'https://izga2lsgsd.execute-api.us-east-2.amazonaws.com/dev/projects'; // API Gateway URL
  private urlsBaseUrl = 'http://localhost:3000/api/urls';
  // private urlsBaseUrl = 'https://izga2lsgsd.execute-api.us-east-2.amazonaws.com/dev/urls'; // API Gateway URL
  private stringsBaseUrl = 'http://localhost:3000/api/strings';
  // private stringsBaseUrl = 'https://izga2lsgsd.execute-api.us-east-2.amazonaws.com/dev/strings'; // API Gateway URL

  constructor(private http: HttpClient, private authService: AuthService) {}

  // getAllProjects(): Observable<any> {
  //   return this.http.get(this.baseUrl); // This will call the new route to get all projects
  // }  
  getAllProjects(): Observable<any[]> {
    const headers = new HttpHeaders({
      'Authorization': `Bearer ${this.authService.getToken()}` // Include the token
    });
    return this.http.get<any[]>(this.baseUrl, { headers });
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

  // deleteProject(id: string): Observable<any> {
  //   return this.http.delete(`${this.baseUrl}/${id}`);
  // }
  deleteProject(id: string): Observable<any> {
    const headers = new HttpHeaders({
      'Authorization': `Bearer ${this.authService.getToken()}` // Include the token
    });
    return this.http.delete(`${this.baseUrl}/${id}`, { headers });
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
  translateString(text: string): Observable<any> {
    return this.http.post(`${this.stringsBaseUrl}/translate`, { text });
  }
  
}