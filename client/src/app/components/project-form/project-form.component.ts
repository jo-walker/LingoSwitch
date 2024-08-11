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
  availableUrls: any[] = [];
  availableStrings: any[] = [];
  showAddUrlForm = false;
  newUrl = '';
  showAddStringForm = false;
  newStringEn = '';
  newStringFr = '';
  newStringDe = '';
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
      selectedStrings: [[], Validators.required]
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
    if (this.newUrl.trim()) {
      this.projectService.createUrl({ url: this.newUrl }).subscribe(
        url => {
          this.availableUrls.push(url);
          this.projectForm.controls['selectedUrls'].setValue([...this.projectForm.controls['selectedUrls'].value, url.id]);
          this.newUrl = '';
          this.showAddUrlForm = false;
        },
        error => {
          console.error('Error adding URL:', error);
          this.error = 'Error adding URL';
        }
      );
    }
  }

  addNewString(): void {
    const newString = {
      eng_us: this.newStringEn,
      fr: this.newStringFr,
      de: this.newStringDe
    };

    if (this.newStringEn.trim() || this.newStringFr.trim() || this.newStringDe.trim()) {
      this.projectService.createString(newString).subscribe(
        string => {
          this.availableStrings.push(string);
          this.projectForm.controls['selectedStrings'].setValue([...this.projectForm.controls['selectedStrings'].value, string.id]);
          this.newStringEn = '';
          this.newStringFr = '';
          this.newStringDe = '';
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
      history: {
        createdAt: new Date().toISOString(),
        createdBy: 'admin'
      }
    };

    if (this.isEditMode && this.projectId) {
      this.projectService.updateProject(this.projectId, project).subscribe(
        response => {
          console.log('Project updated:', response);
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
          console.log('Project created with strings:', response);
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