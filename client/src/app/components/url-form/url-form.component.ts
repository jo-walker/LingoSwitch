import { Component, OnInit } from '@angular/core';
import { FormBuilder, FormGroup, Validators } from '@angular/forms';
import { ActivatedRoute, Router } from '@angular/router';
import { UrlService } from '../../services/url.service';

@Component({
  selector: 'app-url-form',
  templateUrl: './url-form.component.html',
  styleUrls: ['./url-form.component.css']
})
export class UrlFormComponent implements OnInit {
  urlForm: FormGroup;
  isEditMode: boolean = false;
  projectId: string | null = null;
  urlId: string | null = null;

  constructor(
    private fb: FormBuilder,
    private urlService: UrlService,
    private router: Router,
    private route: ActivatedRoute
  ) {
    this.urlForm = this.fb.group({
      url: ['', Validators.required]
    });
  }

  ngOnInit(): void {
    this.projectId = this.route.snapshot.paramMap.get('projectId');
    this.urlId = this.route.snapshot.paramMap.get('id');
    this.isEditMode = !!this.urlId;

    if (this.isEditMode && this.urlId) {
      this.urlService.getUrl(this.urlId).subscribe(
        url => {
          this.urlForm.patchValue({
            url: url.url
          });
        },
        error => {
          console.error('Error loading URL:', error);
        }
      );
    }
  }

  onSubmit(): void {
    if (this.urlForm.valid) {
      const urlData = {
        url: this.urlForm.get('url')?.value,
        projectId: this.projectId
      };

      if (this.isEditMode && this.urlId) {
        this.urlService.updateUrl(this.urlId, urlData).subscribe(
          response => {
            console.log('URL updated:', response);
            this.router.navigate(['/projects', this.projectId]);
          },
          error => {
            console.error('Error updating URL:', error);
          }
        );
      } else {
        this.urlService.createUrl(urlData).subscribe(
          response => {
            console.log('URL created:', response);
            this.router.navigate(['/projects', this.projectId]);
          },
          error => {
            console.error('Error creating URL:', error);
          }
        );
      }
    }
  }
}