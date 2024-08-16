import { Component, OnInit } from '@angular/core';
import { FormBuilder, FormGroup, Validators } from '@angular/forms';
import { ActivatedRoute, Router } from '@angular/router';
import { StringService } from '../../services/string.service';
import { AuthService } from '../../services/auth.service';

@Component({
  selector: 'app-string-form',
  templateUrl: './string-form.component.html',
  styleUrls: ['./string-form.component.scss']
})
export class StringFormComponent implements OnInit {
  stringForm: FormGroup;
  isEditMode: boolean = false;
  projectId: string | null = null;
  stringId: string | null = null;
  errorMessage: string | null = null;
  successMessage: string | null = null;
  messageTimeout: any;

  constructor(
    private fb: FormBuilder,
    private stringService: StringService,
    private authService: AuthService,
    private router: Router,
    private route: ActivatedRoute
  ) {
    this.stringForm = this.fb.group({
      eng_us: ['', Validators.required],
      fr: [''],
      de: ['']
    });
  }

  ngOnInit(): void {
    this.projectId = this.route.snapshot.paramMap.get('projectId');
    this.stringId = this.route.snapshot.paramMap.get('id');
    this.isEditMode = !!this.stringId;

    if (this.isEditMode && this.stringId) {
      this.loadString();
    }
  }

  loadString(): void {
    this.stringService.getString(this.stringId!).subscribe({
      next: (string) => {
        this.stringForm.patchValue({
          eng_us: string.eng_us,
          fr: string.fr,
          de: string.de
        });
      },
      error: (error) => {
        this.setErrorMessage('Failed to load the string data.');
      }
    });
  }

  onSubmit(): void {
    if (this.stringForm.invalid) {
      this.setErrorMessage('Please fill out the form correctly.');
      return;
    }
  
    const stringData = {
      eng_us: this.stringForm.get('eng_us')?.value,
      fr: this.stringForm.get('fr')?.value,
      de: this.stringForm.get('de')?.value,
      projectId: this.projectId,
      userId: this.authService.getCurrentUserId(), // Add userId for history tracking
    };
  
    if (this.isEditMode && this.stringId) {
      this.updateString(stringData);
    } else {
      this.createString(stringData);
    }
  }
  

  updateString(stringData: any): void {
    this.stringService.updateString(this.stringId!, stringData).subscribe({
      next: (response) => {
        this.setSuccessMessage('String updated successfully.');
        this.router.navigate(['/projects', this.projectId]);
      },
      error: (error) => {
        this.setErrorMessage('Failed to update the string.');
      }
    });
  }

  createString(stringData: any): void {
    this.stringService.createString(stringData).subscribe({
      next: (response) => {
        this.setSuccessMessage('String created successfully.');
        this.router.navigate(['/projects', this.projectId]);
      },
      error: (error) => {
        this.setErrorMessage('Failed to create the string.');
      }
    });
  }

  // Set success message and auto-clear after 3 seconds
  setSuccessMessage(message: string): void {
    this.clearMessages(); // Clear any existing messages
    this.successMessage = message;
    this.messageTimeout = setTimeout(() => {
      this.successMessage = null;
    }, 3000); // Clear message after 3 seconds
  }

  // Set error message and auto-clear after 3 seconds
  setErrorMessage(message: string): void {
    this.clearMessages(); // Clear any existing messages
    this.errorMessage = message;
    this.messageTimeout = setTimeout(() => {
      this.errorMessage = null;
    }, 3000); // Clear message after 3 seconds
  }

  // Clear any existing success or error messages
  clearMessages(): void {
    if (this.messageTimeout) {
      clearTimeout(this.messageTimeout); // Clear existing timeout if any
    }
    this.successMessage = null;
    this.errorMessage = null;
  }
}