import { Component, OnInit } from '@angular/core';

@Component({
  selector: 'app-report-search',
  templateUrl: './report-search.component.html',
  styleUrls: ['./report-search.component.scss']
})
export class ReportSearchComponent implements OnInit {
  options: string[][] = [['Yesterday', 'Last week', 'Last month', 'Last year'],
  ['Today', 'This week', 'This month', 'This year']];
  classDiv = ['choose-time'];
  constructor() { }

  ngOnInit() {
  }

  changeClassDiv(i) {
    if (i === 0) {
      this.classDiv[i] = (this.classDiv[i] === 'choose-time') ? 'choose-time hide' : 'choose-time';
    }
  }

}
