import { Component, OnInit } from '@angular/core';
import { StringService } from '../../services/string.service'; // Import the service

@Component({
  selector: 'app-landing-page',
  templateUrl: './landing-page.component.html',
  styleUrls: ['./landing-page.component.scss']
})
export class LandingPageComponent implements OnInit {
  content: any = {};  // Store the content fetched from the API
  selectedLanguage: string = 'english';  // Default language

  constructor(private stringService: StringService) { }

  ngOnInit(): void {
    this.loadContent();  // Load content in the default language
  }

  loadContent(): void {
    // Fetch translated content based on the selected language
    this.stringService.getTranslation('U002', '00004', this.selectedLanguage).subscribe({
      next: (data) => {
        this.content = data.translation;
      },
      error: (error) => {
        console.error('Error loading translation:', error);
      }
    });
  }

  onLanguageChange(event: Event): void {
    const target = event.target as HTMLSelectElement;
    const lang = target.value;
    if (lang) {
      this.selectedLanguage = lang;
      this.loadContent();  // Reload content when language changes
    }
  }
}
