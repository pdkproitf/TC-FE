import { ProjectGetAll } from './../models/project';
import { Member } from './../models/member';
import { Component, OnInit, Input } from '@angular/core';

@Component({
  selector: 'app-report-search',
  templateUrl: './report-search.component.html',
  styleUrls: ['./report-search.component.scss']
})
export class ReportSearchComponent implements OnInit {
  options: string[][] = [['Yesterday', 'Last week', 'Last month', 'Last year'],
  ['Today', 'This week', 'This month', 'This year']];
  @Input()
  members: Member[] = [];
  @Input()
  projectLists: ProjectGetAll[]= [];
  classDiv = ['choose-time hide', 'choose-project hide', 'choose-member hide'];
  constructor() { }

  ngOnInit() {
  }

  changeClassDiv(i) {
    if (i === 0) {
      this.classDiv[i] = (this.classDiv[i] === 'choose-time') ? 'choose-time hide' : 'choose-time';
    }
  }

  showClassDiv(i) {
    if (i === 1) {
      this.classDiv[i] = 'choose-project';
    }
    if (i === 2) {
      this.classDiv[i] = 'choose-member';
    }
  }

  hideClassDiv(i) {
    this.classDiv[i] = this.classDiv[i] + ' hide';
  }

}
