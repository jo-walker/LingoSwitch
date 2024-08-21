import { Component, OnInit, Input } from '@angular/core';
import { UrlService } from '../../services/url.service';

@Component({
  selector: 'app-urls',
  templateUrl: './urls.component.html',
  styleUrls: ['./urls.component.scss']
})
export class UrlsComponent implements OnInit {
  @Input() projectId!: string;
  urls: any[] = [];

  constructor(private urlService: UrlService) {}

  ngOnInit(): void {
    console.log('Project ID:', this.projectId); 
    this.loadUrls();
  }

  // Load the URLs based on the project ID
  loadUrls(): void {
    this.urlService.getUrlsByProjectId(this.projectId).subscribe({
      next: (data) => {
        console.log('Fetched URLs:', data); // Log the fetched URLs
        this.urls = data;
      },
      error: (error) => {
        console.error('Error fetching URLs', error);
      }
  });
  }
  deleteUrl(id: string): void {
    this.urlService.deleteUrl(id).subscribe({
      next: (response) => {
        console.log('URL deleted:', response);
        this.loadUrls(); // Refresh the list after deletion
      },
      error: (error) => {
        console.error('Error deleting URL', error);
      }
  });
  }

  //called when a URL is created or updated
  onUrlChange(): void {
    this.loadUrls(); 
  }
}
