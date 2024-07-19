import { Component } from '@angular/core';
import { HttpClient } from '@angular/common/http';
import { MatSnackBar } from '@angular/material/snack-bar';

@Component({
  selector: 'app-string-form',
  templateUrl: './string-form.component.html',
  styleUrls: ['./string-form.component.css']
})
export class StringFormComponent {
  value = '';
  language = 'en';
  urls = '';

  constructor(private http: HttpClient, private snackBar: MatSnackBar) {}

  addString() {
    const newString = {
      value: this.value,
      language: this.language,
      urls: this.urls.split(',').map(url => url.trim())
    };

    this.http.post('http://localhost:5000/api/strings', newString)
      .subscribe(response => {
        console.log('String added:', response);
        this.snackBar.open('String added successfully!', 'Close', {
          duration: 2000,
        });
        this.value = '';
        this.language = 'en';
        this.urls = '';
      }, error => {
        console.error('Error adding string:', error);
        const errorMessage = error?.error?.message || 'Unknown error';
        this.snackBar.open('Failed to add string: ' + errorMessage, 'Close', {
          duration: 2000,
        });
      });
  }
}
