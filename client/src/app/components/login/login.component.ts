import { Component } from '@angular/core';
import { AuthService } from '../../services/auth.service';
import { Router } from '@angular/router';

@Component({
  selector: 'app-login',
  templateUrl: './login.component.html',
  styleUrls: ['./login.component.scss']
})
export class LoginComponent { 
  username: string = '';
  password: string = '';
  error: string | null = null; // to hold the error message from the server if login fails 

  constructor(private authService: AuthService, private router: Router) {}

  login() {
    this.authService.login(this.username, this.password).subscribe({
      next: (response) => {
        localStorage.setItem('token', response.token);
        this.router.navigate(['/projects']);
        this.error = null; // Clear the error message if login is successful
      },
      error: (error) => {
        console.error('Login error:', error);
        this.error = 'Invalid username or password'; // show a user friendly error message
      }
    });
  }
}