import { Component, OnInit, Input } from '@angular/core';
import { StringService } from '../../services/string.service';

@Component({
  selector: 'app-strings',
  templateUrl: './strings.component.html',
  styleUrls: ['./strings.component.css']
})
export class StringsComponent implements OnInit {
  @Input() projectId!: string;
  strings: any[] = [];
  selectedKey: string = '';
  selectedString: any = null;
  urlsInput: string = '';

  constructor(private stringService: StringService) {}

  ngOnInit(): void {
    this.loadStrings();
  }

  loadStrings(): void {
    this.stringService.getStringsByUrl(window.location.pathname).subscribe(
      data => {
        this.strings = data;
      },
      error => {
        console.error('Error fetching strings', error);
      }
    );
  }

  loadString(): void {
    this.selectedString = this.strings.find(s => s.key === this.selectedKey) || null;
    this.urlsInput = this.selectedString ? this.selectedString.urls.join(', ') : '';
  }

  onSubmit(): void {
    const urls = this.urlsInput.split(',').map(url => url.trim());
    if (this.selectedString) {
      this.stringService.updateString(this.selectedKey, this.selectedString.values, urls).subscribe(
        response => {
          console.log('String updated:', response);
          this.loadStrings(); // Refresh the list of strings after updating
        },
        error => {
          console.error('Error updating string', error);
        }
      );
    }
  }

  deleteString(): void {
    if (this.selectedString) {
      this.stringService.deleteString(this.selectedKey).subscribe(
        response => {
          console.log('String marked as deleted:', response);
          this.loadStrings(); // Refresh the list of strings after marking one as deleted
          this.selectedString = null;
          this.selectedKey = '';
        },
        error => {
          console.error('Error deleting string', error);
        }
      );
    }
  }
}