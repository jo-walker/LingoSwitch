import { Component, OnInit } from '@angular/core';
import { FormBuilder, FormGroup, Validators } from '@angular/forms';
import { ActivatedRoute, Router } from '@angular/router';
import { StringService } from '../../services/string.service';

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

  constructor(
    private fb: FormBuilder,
    private stringService: StringService,
    private router: Router,
    private route: ActivatedRoute
  ) {
    this.stringForm = this.fb.group({
      eng_us: ['', Validators.required],
      fr: ['', Validators.required],
      de: ['', Validators.required]
    });
  }

  ngOnInit(): void {
    this.projectId = this.route.snapshot.paramMap.get('projectId');
    this.stringId = this.route.snapshot.paramMap.get('id');
    this.isEditMode = !!this.stringId;

    if (this.isEditMode && this.stringId) {
      this.stringService.getString(this.stringId).subscribe(
        string => {
          this.stringForm.patchValue({
            eng_us: string.eng_us,
            fr: string.fr,
            de: string.de
          });
        },
        error => {
          console.error('Error loading string:', error);
        }
      );
    }
  }

  onSubmit(): void {
    if (this.stringForm.valid) {
      const stringData = {
        eng_us: this.stringForm.get('eng_us')?.value,
        fr: this.stringForm.get('fr')?.value,
        de: this.stringForm.get('de')?.value,
        projectId: this.projectId
      };

      if (this.isEditMode && this.stringId) {
        this.stringService.updateString(this.stringId, stringData).subscribe(
          response => {
            console.log('String updated:', response);
            this.router.navigate(['/projects', this.projectId]);
          },
          error => {
            console.error('Error updating string:', error);
          }
        );
      } else {
        this.stringService.createString(stringData).subscribe(
          response => {
            console.log('String created:', response);
            this.router.navigate(['/projects', this.projectId]);
          },
          error => {
            console.error('Error creating string:', error);
          }
        );
      }
    }
  }
}