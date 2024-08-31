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
      de: [''],
      mn: [''],
      context: ['', Validators.required]
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
      mn: this.stringForm.get('mn')?.value,
      context: this.stringForm.get('context')?.value, 
      projectId: this.projectId || null, // null if no projectId
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
    console.log(this.stringForm.value); // Debugging for form values before sending to server 
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

  // Set success msg and clear after 3 seconds
  setSuccessMessage(message: string): void {
    this.clearMessages(); // Clear any existing messages
    this.successMessage = message;
    this.messageTimeout = setTimeout(() => {
      this.successMessage = null;
    }, 3000); // Clear message after 3 seconds
  }

  // Set error msg and clear after 3 seconds
  setErrorMessage(message: string): void {
    this.clearMessages(); // Clear existing msgs to show new one without overlap
    this.errorMessage = message;
    this.messageTimeout = setTimeout(() => {
      this.errorMessage = null;
    }, 3000); 
  }

  // Clear any existing success or error msgs
  clearMessages(): void {
    if (this.messageTimeout) {
      clearTimeout(this.messageTimeout); // Clear existing timeout if any
    }
    this.successMessage = null;
    this.errorMessage = null;
  }
  translateString(): void {
    const eng_us = this.stringForm.get('eng_us')?.value;
    if (!eng_us) {
      this.setErrorMessage('Please enter a string to translate.');
      return;
    }
  
    this.stringService.translate(eng_us).subscribe({
      next: (response) => {
        this.stringForm.patchValue({
          fr: response.fr,
          de: response.de
        });
      },
      error: (error) => {
        this.setErrorMessage('Failed to translate the string.');
      }
    });
  }
}  