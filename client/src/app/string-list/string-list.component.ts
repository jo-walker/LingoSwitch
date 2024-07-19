import { Component, OnInit } from '@angular/core';
import { StringService } from '../string.service';

@Component({
  selector: 'app-string-list',
  templateUrl: './string-list.component.html',
  styleUrls: ['./string-list.component.css']
})
export class StringListComponent implements OnInit {
  strings: any[] = [];

  constructor(private stringService: StringService) {}

  ngOnInit(): void {
    this.loadStrings();
  }

  loadStrings() {
    this.stringService.getStrings().subscribe(data => {
      this.strings = data;
      console.log('Strings loaded:', this.strings);
    }, error => {
      console.error('Error loading strings:', error);
    });
  }
}
