import { Component, OnInit } from '@angular/core';
import {AutoCompleteModule} from 'primeng/primeng';

@Component({
  selector: 'app-time-track-bar',
  templateUrl: './time-track-bar.component.html',
  styleUrls: ['./time-track-bar.component.scss']
})
export class TimeTrackBarComponent implements OnInit {
  text: string;
  results: string[] = ['abc', 'xyz'];
  constructor() { }

  ngOnInit() {
  }
  search(event) {
    this.results = ['abc', 'xyz', 'Input'];
  }
  handleDropdown(event) {
    this.results = ['abc', 'xyz', 'DropDown'];
  }
}
