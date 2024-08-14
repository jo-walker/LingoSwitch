import { Component, OnInit, Input } from '@angular/core';
import { UrlService } from '../../services/url.service';

@Component({
  selector: 'app-urls',
  templateUrl: './urls.component.html',
  styleUrls: ['./urls.component.css']
})
export class UrlsComponent implements OnInit {
  @Input() projectId!: string;
  urls: any[] = [];

  constructor(private urlService: UrlService) {}

  ngOnInit(): void {
    console.log('Project ID:', this.projectId); 
    this.loadUrls();
  }
  
  loadUrls(): void {
    this.urlService.getAllUrls().subscribe( // To-Do: don't use deprecated functions
      
      data => {
        console.log('Fetched URLs:', data); // Log the fetched URLs
        this.urls = data;
      },
      error => {
        console.error('Error fetching URLs', error);
      }
    );
  }
  
  //   this.urlService.getUrlsByProjectId(this.projectId).subscribe(
  //     data => {
  //       console.log('Fetched URLs:', data); // Log the fetched data

  //       this.urls = data;
  //     },
  //     error => {
  //       console.error('Error fetching URLs', error);
  //     }
  //   );
  // }

  deleteUrl(id: string): void {
    this.urlService.deleteUrl(id).subscribe(
      response => {
        console.log('URL deleted:', response);
        this.loadUrls(); // Refresh the list after deletion
      },
      error => {
        console.error('Error deleting URL', error);
      }
    );
  }
}