import { Injectable } from '@angular/core';
import { HttpClient, HttpHeaders } from '@angular/common/http';
import { Observable } from 'rxjs';

@Injectable({
  providedIn: 'root'
})
export class StringService {
  private baseUrl = 'http://localhost:3000/api/strings';

  constructor(private http: HttpClient) {}

  getStringsByProjectId(projectId: string, status?: string): Observable<any> {
    const params = status ? { status } : undefined;
    return this.http.get(`${this.baseUrl}/by-project/${projectId}`, { params });
  } 
  
  getString(id: string): Observable<any> {
    return this.http.get(`${this.baseUrl}/${id}`);
  }

  getAllStrings(status?: string): Observable<any[]> {
    let url = `${this.baseUrl}`;
    if (status && status !== 'all') {
      url += `?status=${status}`;
    }
    return this.http.get<any[]>(url);
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
  toggleStringStatus(id: string): Observable<any> {
    return this.http.put(`${this.baseUrl}/toggle-status/${id}`, {}); // Ensure the URL is correct and it sends a PUT request
  }  
  getActiveStrings(): Observable<any[]> {
    return this.http.get<any[]>(`${this.baseUrl}/active`);
  } 
  translate(text: string): Observable<any> {
    return this.http.post(`${this.baseUrl}/translate`, { text });
  }
  getStringsByLanguage(language: string): Observable<any> {
    return this.http.get(`${this.baseUrl}/language/${language}`);
  }
  getStringsByContext(context: string): Observable<any> {
    return this.http.get(`${this.baseUrl}/context/${context}`);
  }
  getFilteredStrings(params: any): Observable<any> {
    return this.http.get(`${this.baseUrl}/filter`, { params });
  }
  getStringByUrlAndLang(urlId: string, stringId: string, lang: string): Observable<any> {
    return this.http.get(`${this.baseUrl}/string-by-url-and-lang?urlId=${urlId}&stringId=${stringId}&lang=${lang}`);
  }  
}