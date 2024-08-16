import { Component, OnInit } from '@angular/core';
import { ProjectService } from '../../services/project.service';

@Component({
  selector: 'app-projects',
  templateUrl: './projects.component.html',
  styleUrls: ['./projects.component.scss']
})
export class ProjectsComponent implements OnInit {
  projects: any[] = [];

  constructor(private projectService: ProjectService) {}

  ngOnInit(): void {
    this.loadProjects();
  }

  loadProjects(): void {
    this.projectService.getAllProjects().subscribe({
      next: (data) => {
        this.projects = data;
      },
      error: (error) => {
        console.error('Error fetching projects', error);
        // Handle error case, for example, by showing a notification
      },
      complete: () => {
        // Optionally handle the completion of the observable
        console.log('Projects loaded successfully');
      }
    });
  }

  deleteProject(id: string): void {
    this.projectService.deleteProject(id).subscribe({
      next: (response) => {
        console.log('Project deleted:', response);
        this.loadProjects(); // Refresh the list after deletion
      },
      error: (error) => {
        console.error('Error deleting project', error);
        // Handle error case, for example, by showing a notification
      },
      complete: () => {
        // Optionally handle the completion of the observable
        console.log('Delete operation completed');
      }
    });
  }
}