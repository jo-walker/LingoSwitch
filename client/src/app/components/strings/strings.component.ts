import { Component, OnInit, Input } from '@angular/core';
import { StringService } from '../../services/string.service';
import { HttpErrorResponse } from '@angular/common/http';
import { HttpClient } from '@angular/common/http';
@Component({
  selector: 'app-strings',
  templateUrl: './strings.component.html',
  styleUrls: ['./strings.component.scss']
})
export class StringsComponent implements OnInit {
  @Input() projectId!: string;
  strings: any[] = [];
  filterStatus: string = 'active'; // Default all strings
  selectedLanguage: string = '';
  selectedContext: string = '';
  urlId: string = 'U001';  // Set to the appropriate value
  stringId: string = '1';  // Set to the appropriate value

  labelText: string = '';  //to hold the text for the label

  constructor(private stringService: StringService, private httpClient: HttpClient) {} 

  ngOnInit(): void {
    this.loadStrings();
  }
  // loadAllStrings(): void {
  //   this.stringService.getAllStrings().subscribe({
  //     next: (data) => {
  //       this.strings = data;
  //     },
  //     error: (error) => {
  //       console.error('Error fetching all strings', error);
  //     }
  //   });
  // }

  // Load strings based on the selected filter
  loadStrings(): void {
    const params: any = {};
  
    if (this.filterStatus) {
      params.status = this.filterStatus;
    }
  
    if (this.selectedLanguage) {
      params.language = this.selectedLanguage;
    }
  
    if (this.selectedContext) {
      params.context = this.selectedContext;
    }
  
    console.log('Params sent to API:', params);
  
    this.stringService.getFilteredStrings(params).subscribe({
      next: (data) => {
        this.strings = data;
      },
      error: (error: HttpErrorResponse) => {
        console.error('Error fetching filtered strings', error);
        if (error.status === 0) {
          console.error('Network error - please check your internet connection.');
        } else {
          console.error(`Backend returned code ${error.status}, body was: `, error.error);
        }
      }
    });
  }
  // Method to update the label text based on the selected language
  updateLabelText(): void {
    if (this.selectedLanguage === 'fr') {
      this.labelText = this.strings[0]?.fr || '';
    } else if (this.selectedLanguage === 'de') {
      this.labelText = this.strings[0]?.de || '';
    } else {
      this.labelText = this.strings[0]?.eng_us || '';
    }
  }
  deleteString(id: string): void {
    this.stringService.deleteString(id).subscribe({
      next: (response) => {
        console.log('String deleted:', response);
        this.loadStrings(); // Refresh the list of strings after deletion
      },
      error: (error) => {
        console.error('Error deleting string', error);
      }
  });
  }
  toggleStatus(stringId: string): void {
    console.log(`Toggling status for string with ID: ${stringId}`);
    this.stringService.toggleStringStatus(stringId).subscribe({
      next: (response) => {
        console.log('Toggle status response:', response); // Log the response to check if the toggle was successful
        this.loadStrings(); // Reload strings after toggling status
      },
      error: (error) => {
        console.error('Error toggling string status', error);
      }
    });
  }
  // Handle the change of status filter
  onFilterChange(event: Event): void {
    const selectElement = event.target as HTMLSelectElement;
    this.filterStatus = selectElement.value;
    console.log('Filter Status Changed:', this.filterStatus); // Log the filter change
    this.loadStrings(); // Reload strings based on the selected filter
  }  

  // When user changes language, app triggers API call to get strings and update the view
  onLanguageChange(event: Event): void {
    // onLanguageChange(lang: string): void {

    const selectElement = event.target as HTMLSelectElement;
    const selectedLanguage = selectElement.value;

    // this.urlId = 'U001';
    // this.stringId = '1'; 

    // this.loadStringByUrlAndLang(selectedLanguage);
    this.loadStringByUrlAndLang(this.urlId, this.stringId, selectedLanguage);

    // Load strings by language
    // this.stringService.getStringsByLanguage(selectedLanguage).subscribe({
    //   next: (data) => {
    //     this.strings = data;
    //   },
    //   error: (error) => {
    //     console.error('Error fetching strings by language', error);
    //   }
    // });
  }

  loadStringByUrlAndLang(urlId: string, stringId: string, lang: string): void {
    this.httpClient.get<any>(`/api/strings/string-by-url-and-lang?urlId=${urlId}&stringId=${stringId}&lang=${lang}`)
      .subscribe({
        next: (data: any) => {  // can replace `any` with the correct type if known
          this.strings = data;
          this.updateLabelText();  // Call this after the data is loaded
        },
        error: (err: any) => {  // You can replace `any` with the correct type if known
          console.error('Error fetching string by URL and language:', err);
        }
      });
  }  

  onContextChange(event: Event): void {
    const selectElement = event.target as HTMLSelectElement;
    const selectedContext = selectElement.value.trim();  // Trim any unnecessary spaces
    console.log('Selected Context:', selectedContext); // Log the selected context
    this.loadStrings(); // Reload strings based on the selected context

    // Load strings by context
    this.stringService.getStringsByContext(selectedContext).subscribe({
      next: (data) => {
        this.strings = data;
      },
      error: (error) => {
        console.error('Error fetching strings by context', error);
      }
    });
  }    
}