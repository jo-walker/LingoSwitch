  import { Injectable } from '@angular/core';
  import { HttpClient } from '@angular/common/http';
  import { Observable } from 'rxjs';
  import { tap } from 'rxjs/operators';  // Import the tap operator

  @Injectable({
    providedIn: 'root',
  })
  export class AuthService {
    private baseUrl = 'http://localhost:3000/api/auth';
    // private baseUrl = 'https://izga2lsgsd.execute-api.us-east-2.amazonaws.com/dev/auth'; // API Gateway URL

    constructor(private http: HttpClient) {}
  
    register(userData: { username: string; password: string }): Observable<any> {
      return this.http.post(`${this.baseUrl}/register`, userData);
    }
  // Add the login method to the AuthService class to send a POST request to the /login route of the API to log in the user and store the token and user ID in the local storage. 
    login(username: string, password: string): Observable<any> {
      return this.http.post(`${this.baseUrl}/login`, { username, password }).pipe(
        tap((response: any) => {
          if (response.token) {
            localStorage.setItem('authToken', response.token);
            localStorage.setItem('userId', response.userId);
          }
        })
      );
    }
  
    logout() {
      localStorage.removeItem('authToken'); // Remove the token when logging out
      localStorage.removeItem('userId'); // Remove the user ID when logging out
    }
  
    isLoggedIn(): boolean {
      return !!localStorage.getItem('authToken'); // Return true if the token is present
    }
  
    getCurrentUserId(): string | null {
      return localStorage.getItem('userId'); // Return null if there is no user ID
    }
  
    getToken(): string {
      return localStorage.getItem('authToken') || ''; // Return an empty string if there is no token
    }
  }
  