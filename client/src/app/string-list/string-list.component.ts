import { Component, OnInit } from '@angular/core';
import { StringService } from '../string.service';

@Component({
  selector: 'app-string-list',
  templateUrl: './string-list.component.html',
  styleUrls: ['./string-list.component.css']
})
export class StringListComponent implements OnInit {
  strings: any[] = [];
  language = 'en';
  url = '/home';

  constructor(private stringService: StringService) {}

  ngOnInit(): void {
    this.loadStrings();
  }

  loadStrings(): void {
    this.stringService.getStrings(this.language, this.url).subscribe(data => {
      this.strings = data;
    });
  }
}
