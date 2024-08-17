import { Component, OnInit, Input } from '@angular/core';
import { StringService } from '../../services/string.service';

@Component({
  selector: 'app-strings',
  templateUrl: './strings.component.html',
  styleUrls: ['./strings.component.scss']
})
export class StringsComponent implements OnInit {
  @Input() projectId!: string;
  strings: any[] = [];

  constructor(private stringService: StringService) {}

  ngOnInit(): void {
    this.loadStrings();
  }

  loadStrings(): void {
    this.stringService.getAllStrings().subscribe({
      next: (data) => {
        this.strings = data;
      },
      error: (error) => {
        console.error('Error fetching strings', error);
      }
  });
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
    this.stringService.toggleStringStatus(stringId).subscribe({
      next: () => {
        this.loadStrings(); // Reload strings after toggling status
      },
      error: (error) => {
        console.error('Error toggling string status', error);
      }
    });
  }
}
