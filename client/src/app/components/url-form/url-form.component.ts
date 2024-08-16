import { Component, OnInit, Input, Output, EventEmitter } from '@angular/core';
import { FormBuilder, FormGroup, Validators } from '@angular/forms';
import { ActivatedRoute, Router } from '@angular/router';
import { UrlService } from '../../services/url.service';

@Component({
  selector: 'app-url-form',
  templateUrl: './url-form.component.html',
  styleUrls: ['./url-form.component.scss']
})
export class UrlFormComponent implements OnInit {
  @Input() projectId!: string;
  @Output() urlChange: EventEmitter<void> = new EventEmitter();

  urlForm: FormGroup;
  isEditMode: boolean = false;
  urlId: string | null = null;
  isLoading: boolean = false; // Loading state
  successMessage: string | null = null;
  errorMessage: string | null = null;

  constructor(
    private fb: FormBuilder,
    private urlService: UrlService,
    private router: Router,
    private route: ActivatedRoute
  ) {
    this.urlForm = this.fb.group({
      url: ['', [Validators.required, Validators.pattern('https?://.+')]]
    });
  }

  ngOnInit(): void {
    this.urlId = this.route.snapshot.paramMap.get('id');
    this.isEditMode = !!this.urlId;

    if (this.isEditMode && this.urlId) {
      this.loadUrl();
    }
  }

  loadUrl(): void {
    this.isLoading = true;
    this.urlService.getUrl(this.urlId!).subscribe({
      next: (url) => {
        this.urlForm.patchValue({ url: url.url });
        this.isLoading = false;
      },
      error: (error) => {
        this.errorMessage = 'Error loading URL.';
        this.isLoading = false;
      }
    });
  }

  onSubmit(): void {
    if (this.urlForm.invalid) return;

    this.isLoading = true;
    const urlData = {
      url: this.urlForm.get('url')?.value,
      projectId: this.projectId
    };

    if (this.isEditMode && this.urlId) {
      this.urlService.updateUrl(this.urlId, urlData).subscribe({
        next: (response) => {
          this.successMessage = 'URL updated successfully.';
          this.isLoading = false;
          this.urlChange.emit();
          setTimeout(() => this.router.navigate(['/projects', this.projectId]), 2000); // Delay for success message
        },
        error: (error) => {
          this.errorMessage = 'Error updating URL.';
          this.isLoading = false;
        }
      });
    } else {
      this.urlService.createUrl(urlData).subscribe({
        next: (response) => {
          this.successMessage = 'URL created successfully.';
          this.isLoading = false;
          this.urlChange.emit();
          setTimeout(() => this.router.navigate(['/projects', this.projectId]), 2000); // Delay for success message
        },
        error: (error) => {
          this.errorMessage = 'Error creating URL.';
          this.isLoading = false;
        }
      });
    }
  }
}