import { ProjectGetAll } from './../models/project';
import { Member } from './../models/member';
import { Component, OnInit, Input, Output, EventEmitter } from '@angular/core';

@Component({
  selector: 'app-report-search',
  templateUrl: './report-search.component.html',
  styleUrls: ['./report-search.component.scss']
})
export class ReportSearchComponent implements OnInit {
  options: string[][] = [['Yesterday', 'Last week', 'Last month', 'Last year'],
  ['Today', 'This week', 'This month', 'This year']];
  timeRange = 'Last week';
  firstWeekDay;
  lastWeekDay;
  firstString;
  lastString;
  @Input()
  members: Member[] = [];
  @Input()
  projectLists: ProjectGetAll[]= [];
  @Output()
  emitRange = new EventEmitter<any>();
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

  chooseRange(row, col) {
    let res = 2 * row + 4 * col;
    console.log(res);
    this.thisWeekChoosed();
  }

  thisWeekChoosed() {
    this.timeRange = this.options[1][1];
    this.changeClassDiv(0);
    this.generateThisWeek();
    this.emitRange.emit([this.firstString, this.lastString]);
  }

  dateToShortString(date: Date): string {
    let yearString = date.getFullYear().toString();
    let monthString = ((date.getMonth() + 1) < 10) ? '0' + (date.getMonth() + 1).toString() : (date.getMonth() + 1).toString();
    let dateString = (date.getDate() < 10) ? '0' + date.getDate().toString() : date.getDate().toString();
    let res = yearString + '-' + monthString + '-' + dateString;
    return res;
  }

  generateThisWeek() {
    let curr = new Date();
    let currDate = curr.getDate();
    curr.setDate(currDate);
    let curr1 = new Date(curr);
    let curr2 = new Date(curr);
    let first = curr1.getDate() - curr1.getDay();
    this.firstWeekDay = new Date(curr1.setDate(first));
    this.lastWeekDay = new Date(curr2.setDate(first + 6));
    this.firstString = this.dateToShortString(this.firstWeekDay);
    this.lastString = this.dateToShortString(this.lastWeekDay);
    console.log(this.firstString + '-' + this.lastString);
  }

}
