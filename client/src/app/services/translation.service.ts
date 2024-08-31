import { Injectable } from '@angular/core';
import { HttpClient, HttpHeaders } from '@angular/common/http';
import { map, Observable } from 'rxjs';
import { environment } from '../../environments/environment';

@Injectable({
  providedIn: 'root',
})
export class TranslationService {
  private apiUrl = 'https://translation.googleapis.com/language/translate/v2'; // Example: Google Translate API URL
  private apiKey = environment.apiKey;

  constructor(private http: HttpClient) {}

  translate(text: string, targetLanguage: string): Observable<string> {
    const body = {
      q: text,
      target: targetLanguage,
      format: 'text',
    };

    const headers = new HttpHeaders({
      'Content-Type': 'application/json',
      Authorization: `Bearer ${this.apiKey}`, // Example for Google Translate API
    });

    return this.http.post<any>(`${this.apiUrl}?key=${this.apiKey}`, body, { headers })
      .pipe(
        map((response: { data: { translations: { translatedText: any; }[]; }; }) => response.data.translations[0].translatedText)
      );
  }
}