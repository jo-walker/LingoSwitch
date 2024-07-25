import { Component, Inject, OnInit } from '@angular/core';
import { StringService } from './string.service';

@Component({
  selector: 'app-string-list',
  templateUrl: './string-list.component.html',
  styleUrls: ['./string-list.component.css']
})
export class StringListComponent implements OnInit {
  strings: any[] = [];
  selectedLanguage: string = 'en'; // Default language
  currentUrl: string = window.location.pathname;
  languages: string[] = [];

  constructor(private stringService: StringService) {}

  ngOnInit(): void {
    this.fetchLanguages();
  }

  fetchLanguages(): void {
    this.stringService.getLanguages().subscribe(
      (data) => {
        this.languages = data;
        this.fetchStrings(); // Fetch strings after loading languages
      },
      (error) => {
        console.error('Error fetching languages', error);
      }
    );
  }

  fetchStrings(): void {
    this.stringService.getStrings(this.currentUrl, this.selectedLanguage).subscribe(
      (data) => {
        this.strings = data;
      },
      (error) => {
        console.error('Error fetching strings', error);
      }
    );
  }
}