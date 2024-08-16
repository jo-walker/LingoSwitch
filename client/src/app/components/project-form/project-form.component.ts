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
      newUrl: [''], // Add this form control for new URLs
      newStringEn: [''], // Add this form control for new English string
      newStringFr: [''], // Add this form control for new French string
      newStringDe: ['']  // Add this form control for new German string
    });
  }

  ngOnInit(): void {
    this.projectId = this.route.snapshot.paramMap.get('id');
    this.isEditMode = !!this.projectId;

    if (this.isEditMode && this.projectId) {
      this.projectService.getProject(this.projectId).subscribe(
        project => {
          this.projectForm.patchValue({
            name: project.name,
            languages: project.languages.join(', '),
            selectedUrls: project.urls ? project.urls.map((url: any) => url.id) : [],
            selectedStrings: project.strings ? project.strings.map((string: any) => string.id) : []
          });
        },
        error => {
          console.error('Error loading project:', error);
          this.error = 'Error loading project';
        }
      );
    }

    this.loadAvailableUrls();
    this.loadAvailableStrings();
  }

  loadAvailableUrls(): void {
    this.projectService.getUrls().subscribe(
      urls => {
        this.availableUrls = urls || [];
      },
      error => {
        console.error('Error loading URLs:', error);
        this.error = 'Error loading URLs';
      }
    );
  }

  loadAvailableStrings(): void {
    this.projectService.getStrings().subscribe(
      strings => {
        this.availableStrings = strings || [];
      },
      error => {
        console.error('Error loading strings:', error);
        this.error = 'Error loading strings';
      }
    );
  }
  addNewUrl(): void {
    // Get the new URL value from the form
    const newUrlValue = this.projectForm.get('newUrl')?.value;
  
    // Ensure the URL value is not empty or invalid
    if (newUrlValue && newUrlValue.trim()) {
      console.log('Sending URL:', { url: newUrlValue }); // Log the payload
  
      // Construct the payload with the URL and optionally the project ID if needed
      const newUrlPayload = {
        url: newUrlValue,
        projectId: this.projectId // Make sure this.projectId is defined and holds the correct value
      };
  
      // Call the service to create the URL
      this.projectService.createUrl(newUrlPayload).subscribe(
        (response: any) => {
          console.log('Successfully added URL:', response); // Log the successful response
          
          // Update the availableUrls array with the new URL object from the response
          this.availableUrls.push(response);
  
          // Update the selectedUrls form control with the new URL's ID
          const currentSelectedUrls = this.projectForm.controls['selectedUrls'].value || [];
          this.projectForm.controls['selectedUrls'].setValue([...currentSelectedUrls, response.id]);
  
          // Reset the new URL input field
          this.projectForm.get('newUrl')?.reset();
  
          // Hide the add URL form
          this.showAddUrlForm = false;
        },
        (error) => {
          // Log detailed error information in case of failure
          console.error('Error adding URL:', error);
  
          // Display a user-friendly error message
          this.error = `Error adding URL: ${error.message || 'Unknown error'}`;
        }
      );
    } else {
      // Log and handle the case where the URL value is invalid
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

      this.projectService.createString(newString).subscribe(
        string => {
          this.availableStrings.push(string);
          this.projectForm.controls['selectedStrings'].setValue([...this.projectForm.controls['selectedStrings'].value, string.id]);
          this.projectForm.get('newStringEn')?.reset();
          this.projectForm.get('newStringFr')?.reset();
          this.projectForm.get('newStringDe')?.reset();
          this.showAddStringForm = false;
        },
        error => {
          console.error('Error adding string:', error);
          this.error = 'Error adding string';
        }
      );
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
      this.projectService.updateProject(this.projectId, project).subscribe(
        response => {
          this.router.navigate(['/projects']);
        },
        error => {
          console.error('Error updating project:', error);
          this.error = 'Error updating project';
        }
      );
    } else {
      this.projectService.createProjectWithStrings(project).subscribe(
        response => {
          this.router.navigate(['/projects']);
        },
        error => {
          console.error('Error creating project with strings:', error);
          this.error = 'Error creating project with strings';
        }
      );
    }
  }
}
