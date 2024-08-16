import { Component, OnInit } from '@angular/core';
import { Router, ActivatedRoute } from '@angular/router';
import { ProjectService } from '../../services/project.service';
import { FormBuilder, FormGroup, Validators } from '@angular/forms';

@Component({
  selector: 'app-project-form',
  templateUrl: './project-form.component.html',
  styleUrls: ['./project-form.component.scss'],
})
export class ProjectFormComponent implements OnInit {
  projectForm: FormGroup;
  projectId: string | null = null;
  isEditMode = false;
  availableUrls: any[] = [];
  availableStrings: any[] = [];
  showAddUrlForm = false;
  showAddStringForm = false;
  error: string | null = null;

  constructor(
    private fb: FormBuilder,
    private projectService: ProjectService,
    private router: Router,
    private route: ActivatedRoute
  ) {
    this.projectForm = this.fb.group({
      name: ['', Validators.required],
      languages: ['', Validators.required],
      selectedUrls: [[], Validators.required],
      selectedStrings: [[], Validators.required],
      newUrl: [''],
      newStringEn: [''],
      newStringFr: [''],
      newStringDe: [''],
    });
  }

  ngOnInit(): void {
    this.projectId = this.route.snapshot.paramMap.get('id');
    this.isEditMode = !!this.projectId;

    if (this.isEditMode && this.projectId) {
      this.loadProject();
    }

    this.loadAvailableUrls();
    this.loadAvailableStrings();
  }

  loadProject(): void {
    this.projectService.getProject(this.projectId!).subscribe({
      next: (project) => {
        this.projectForm.patchValue({
          name: project.name,
          languages: project.languages.join(', '),
          selectedUrls: project.urls ? project.urls.map((url: any) => url.id) : [],
          selectedStrings: project.strings ? project.strings.map((string: any) => string.id) : [],
        });
      },
      error: (error) => {
        console.error('Error loading project:', error);
        this.error = 'Error loading project';
      }
    });
  }

  loadAvailableUrls(): void {
    this.projectService.getUrls().subscribe({
      next: (urls) => {
        this.availableUrls = urls || [];
      },
      error: (error) => {
        console.error('Error loading URLs:', error);
        this.error = 'Error loading URLs';
      }
    });
  }

  loadAvailableStrings(): void {
    this.projectService.getStrings().subscribe({
      next: (strings) => {
        this.availableStrings = strings || [];
      },
      error: (error) => {
        console.error('Error loading strings:', error);
        this.error = 'Error loading strings';
      }
    });
  }

  addNewUrl(): void {
    const newUrlValue = this.projectForm.get('newUrl')?.value;

    if (newUrlValue && newUrlValue.trim()) {
      const newUrlPayload = {
        url: newUrlValue,
        projectId: this.projectId
      };

      this.projectService.createUrl(newUrlPayload).subscribe({
        next: (response) => {
          this.availableUrls.push(response);
          const currentSelectedUrls = this.projectForm.controls['selectedUrls'].value || [];
          this.projectForm.controls['selectedUrls'].setValue([...currentSelectedUrls, response.id]);
          this.projectForm.get('newUrl')?.reset();
          this.showAddUrlForm = false;
        },
        error: (error) => {
          console.error('Error adding URL:', error);
          this.error = `Error adding URL: ${error.message || 'Unknown error'}`;
        }
      });
    } else {
      console.error('Invalid URL: URL is empty or contains only whitespace.');
      this.error = 'Please provide a valid URL.';
    }
  }

  addNewString(): void {
    const newStringEn = this.projectForm.get('newStringEn')?.value;
    const newStringFr = this.projectForm.get('newStringFr')?.value;
    const newStringDe = this.projectForm.get('newStringDe')?.value;

    if (newStringEn.trim() || newStringFr.trim() || newStringDe.trim()) {
      const newString = {
        eng_us: newStringEn,
        fr: newStringFr,
        de: newStringDe
      };

      this.projectService.createString(newString).subscribe({
        next: (string) => {
          this.availableStrings.push(string);
          this.projectForm.controls['selectedStrings'].setValue([...this.projectForm.controls['selectedStrings'].value, string.id]);
          this.projectForm.get('newStringEn')?.reset();
          this.projectForm.get('newStringFr')?.reset();
          this.projectForm.get('newStringDe')?.reset();
          this.showAddStringForm = false;
        },
        error: (error) => {
          console.error('Error adding string:', error);
          this.error = 'Error adding string';
        }
      });
    }
  }

  onSubmit(): void {
    const project = {
      name: this.projectForm.get('name')?.value,
      languages: this.projectForm.get('languages')?.value.split(',').map((lang: string) => lang.trim()),
      urls: this.projectForm.get('selectedUrls')?.value,
      strings: this.projectForm.get('selectedStrings')?.value,
    };

    if (this.isEditMode && this.projectId) {
      this.projectService.updateProject(this.projectId, project).subscribe({
        next: () => {
          this.router.navigate(['/projects']);
        },
        error: (error) => {
          console.error('Error updating project:', error);
          this.error = 'Error updating project';
        }
      });
    } else {
      this.projectService.createProjectWithStrings(project).subscribe({
        next: () => {
          this.router.navigate(['/projects']);
        },
        error: (error) => {
          console.error('Error creating project with strings:', error);
          this.error = 'Error creating project with strings';
        }
      });
    }
  }
}