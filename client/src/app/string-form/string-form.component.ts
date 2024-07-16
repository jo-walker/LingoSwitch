import { Component } from '@angular/core';
import { StringService } from '../string.service';

@Component({
  selector: 'app-string-form',
  templateUrl: './string-form.component.html',
  styleUrls: ['./string-form.component.css']
})
export class StringFormComponent {
  stringData = { value: '', language: 'en', urls: ['/home'] };

  constructor(private stringService: StringService) {}

  addString(): void {
    this.stringService.addString(this.stringData).subscribe(response => {
      console.log('String added:', response);
    });
  }
}
