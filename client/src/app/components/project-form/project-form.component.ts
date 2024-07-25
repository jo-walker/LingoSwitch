import { Component, OnInit } from '@angular/core';
import { Router, ActivatedRoute } from '@angular/router';
import { ProjectService } from '../../services/project.service';
import { FormBuilder, FormGroup, Validators } from '@angular/forms';

@Component({
  selector: 'app-project-form',
  templateUrl: './project-form.component.html',
  styleUrls: ['./project-form.component.css']
})
export class ProjectFormComponent implements OnInit {
  projectForm: FormGroup;
  projectId: string | null = null;
  isEditMode = false;

  constructor(
    private fb: FormBuilder,
    private projectService: ProjectService,
    private router: Router,
    private route: ActivatedRoute
  ) {
    this.projectForm = this.fb.group({
      name: ['', Validators.required],
      languages: ['', Validators.required]
    });
  }

  ngOnInit(): void {
    this.projectId = this.route.snapshot.paramMap.get('id');
    this.isEditMode = !!this.projectId;

    if (this.isEditMode && this.projectId) {
      this.projectService.getProjectById(this.projectId).subscribe(
        project => {
          this.projectForm.patchValue({
            name: project.name,
            languages: project.languages.join(', ')
          });
        },
        error => {
          console.error('Error loading project:', error);
        }
      );
    }
  }

  onSubmit(): void {
    if (this.projectForm.valid) {
      const project = {
        name: this.projectForm.get('name')?.value,
        languages: this.projectForm.get('languages')?.value.split(',').map((lang: string) => lang.trim())
      };

      if (this.isEditMode && this.projectId) {
        this.projectService.updateProject(this.projectId, project).subscribe(
          response => {
            console.log('Project updated:', response);
            this.router.navigate(['/projects']);
          },
          error => {
            console.error('Error updating project:', error);
          }
        );
      } else {
        this.projectService.createProject(project).subscribe(
          response => {
            console.log('Project created:', response);
            this.router.navigate(['/projects']);
          },
          error => {
            console.error('Error creating project:', error);
          }
        );
      }
    }
  }
}