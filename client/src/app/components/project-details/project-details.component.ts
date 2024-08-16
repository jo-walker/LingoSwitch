import { Component, OnInit } from '@angular/core';
import { ActivatedRoute, Router } from '@angular/router';
import { ProjectService } from '../../services/project.service';
import { UrlService } from '../../services/url.service';
import { StringService } from '../../services/string.service';

@Component({
  selector: 'app-project-details',
  templateUrl: './project-details.component.html',
  styleUrls: ['./project-details.component.scss']
})
export class ProjectDetailsComponent implements OnInit {
  project: any;
  error: string | null = null;

  constructor(
    private route: ActivatedRoute,
    private router: Router,
    private projectService: ProjectService,
    private urlService: UrlService,
    private stringService: StringService
  ) {}

  ngOnInit(): void {
    const id = this.route.snapshot.paramMap.get('id');
    if (id) {
      this.projectService.getProject(id).subscribe(
        project => {
          this.project = project;
        },
        error => {
          console.error('Error fetching project details:', error);
          this.error = 'Error fetching project details';
        }
      );
    }
  }

  deleteUrl(id: string): void {
    this.urlService.deleteUrl(id).subscribe(
      response => {
        console.log('URL deleted:', response);
        this.project.urls = this.project.urls.filter((url: any) => url.id !== id);
      },
      error => {
        console.error('Error deleting URL', error);
      }
    );
  }

  deleteString(id: string): void {
    this.stringService.deleteString(id).subscribe(
      response => {
        console.log('String deleted:', response);
        this.project.strings = this.project.strings.filter((string: any) => string.id !== id);
      },
      error => {
        console.error('Error deleting string', error);
      }
    );
  }
}