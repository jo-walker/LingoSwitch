import { Component, OnInit } from '@angular/core';
import { StringService } from '../../services/string.service';

@Component({
  selector: 'app-strings',
  templateUrl: './strings.component.html',
  styleUrls: ['./strings.component.scss']
})
export class StringsComponent implements OnInit {
  rows: Array<any> = [];
  totalRecords: number = 0;
  loading: boolean = true;

  constructor(private stringService: StringService) {}

  ngOnInit(): void {
    this.loadStrings(); // Load the strings initially
  }
  loadStringsLazy(event: any): void {
    this.loading = true;
    this.stringService.getStrings(event.first, event.rows).subscribe({
        next: (data) => {
            this.rows = data.strings || [];
            this.totalRecords = data.totalRecords || 0;
            this.loading = false;
        },
        error: (error) => {
            console.error('Error fetching strings:', error);
            this.loading = false;
        }
    });
}

  loadStrings(): void {
    this.loading = true;
    this.stringService.getAllStrings().subscribe({
      next: (data) => {
        console.log('Fetched Strings:', data);  // Check if data is being fetched
        this.rows = data; // Assign data to rows
        this.totalRecords = data.length;
        this.loading = false;
      },
      error: (error) => {
        console.error('Error fetching strings', error);
        this.loading = false;
      }
    });
  }

  toggleStatus(row: any): void {
    const updatedStatus = !row.active;  // Toggle the status
    console.log(`Toggling status for string ID ${row.id} to ${updatedStatus}`);

    this.stringService.toggleStringStatus(row.id, updatedStatus).subscribe({
      next: (response) => {
        console.log('Status updated:', response);
        row.active = updatedStatus;  // Update the local state
      },
      error: (error) => {
        console.error('Error updating status:', error);
      }
    });
  }
}