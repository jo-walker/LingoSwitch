import { Component, OnInit } from '@angular/core';
import { Router, ActivatedRoute } from '@angular/router';
import { ProjectService } from '../../services/project.service';
import { FormBuilder, FormGroup, Validators } from '@angular/forms';
import { AuthService } from '../../services/auth.service';

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
  isLoading = false;  // loading state
  errorMessage: string | null = null;  // error message
  successMessage: string | null = null;  // success message

  constructor(
    private fb: FormBuilder,
    private projectService: ProjectService,
    private authService: AuthService,
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
    this.isLoading = true; // set loading state to true before making the request
    this.projectService.getProject(this.projectId!).subscribe({
      next: (project) => {
        this.projectForm.patchValue({
          name: project.name,
          languages: project.languages.join(', '),
          selectedUrls: project.urls ? project.urls.map((url: any) => url.id) : [],
          selectedStrings: project.strings ? project.strings.map((string: any) => string.id) : [],
        });
        this.isLoading = false; // after request is completed, stop the loading state
      },
      error: (error) => {
        console.error('Error loading project:', error);
        this.isLoading = false; // stop loading state on error
        setTimeout(() => this.errorMessage = null, 3000);  // hide error message
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
        this.errorMessage = 'Error loading URLs.';
        setTimeout(() => this.errorMessage = null, 3000);
      }
    });
  }  

  loadAvailableStrings(): void {
    this.projectService.getStrings().subscribe({
      next: (strings) => {
        this.availableStrings = strings || [];
      },
      error: (error) => {
        this.errorMessage= 'Error loading strings:';
        setTimeout(() => this.errorMessage = null, 3000); 
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
          this.successMessage = 'URL added successfully.';
          setTimeout(() => this.successMessage = null, 3000);
        },
        error: (error) => {
          console.error('Error adding URL:', error);
          this.errorMessage = `Error adding URL: ${error.status === 404 ? 'URL endpoint not found' : error.message}`;
          setTimeout(() => this.errorMessage = null, 3000);
        }
      });
      
    } else {
      this.errorMessage = 'Please provide a valid URL.';
      setTimeout(() => this.errorMessage = null, 3000);  // Auto-hide error message
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
          this.errorMessage = 'Error adding string.';
          setTimeout(() => this.errorMessage = null, 3000);  // Automatically hide error msg
        }
      });
    }
  }
  onSubmit(): void {
    if (this.projectForm.invalid) return;
  
    this.isLoading = true;
  
    const userId = this.authService.getCurrentUserId(); 
  
    const project: any = {
      name: this.projectForm.get('name')?.value,
      languages: this.projectForm.get('languages')?.value.split(',').map((lang: string) => lang.trim()),
      urls: this.projectForm.get('selectedUrls')?.value,
      strings: this.projectForm.get('selectedStrings')?.value,
      updatedBy: userId, 
    };
  
    // Only set createdBy when creating a new project
    if (!this.isEditMode) {
      project.createdBy = userId;
    }
  
    if (this.isEditMode && this.projectId) {
      this.projectService.updateProject(this.projectId, project).subscribe({
        next: () => {
          this.successMessage = 'Project updated successfully.';
          this.isLoading = false;
          setTimeout(() => {
            this.successMessage = null;
            this.router.navigate(['/projects']);
          }, 3000);
        },
        error: (error) => {
          this.errorMessage = 'Error updating project.';
          this.isLoading = false;
        }
      });
    } else {
      this.projectService.createProjectWithStrings(project).subscribe({
        next: () => {
          this.successMessage = 'Project created successfully.';
          this.isLoading = false;
          setTimeout(() => {
            this.successMessage = null;
            this.router.navigate(['/projects']);
          }, 3000);
        },
        error: (error) => {
          this.errorMessage = 'Error creating project.';
          this.isLoading = false;
        }
      });
    }
  }
  
  

  toggleAddUrlForm(): void {
    this.showAddUrlForm = !this.showAddUrlForm;
  }

  toggleAddStringForm(): void {
    this.showAddStringForm = !this.showAddStringForm;
  }
}