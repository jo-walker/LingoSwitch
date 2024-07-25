import { Component, OnInit } from '@angular/core';
import { ProjectService } from '../../services/project.service';

@Component({
  selector: 'app-projects',
  templateUrl: './projects.component.html',
  styleUrls: ['./projects.component.css']
})
export class ProjectsComponent implements OnInit {
  projects: any[] = [];

  constructor(private projectService: ProjectService) { }

  ngOnInit(): void {
    this.loadProjects();
  }

  loadProjects(): void {
    this.projectService.getProjects().subscribe(
      data => {
        this.projects = data;
      },
      error => {
        console.error('Error fetching projects', error);
      }
    );
  }

  deleteProject(id: string): void {
    this.projectService.deleteProject(id).subscribe(
      response => {
        console.log('Project deleted:', response);
        this.loadProjects(); // Refresh the list after deletion
      },
      error => {
        console.error('Error deleting project', error);
      }
    );
  }
}