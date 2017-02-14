import { Component, OnInit } from '@angular/core';

@Component({
  selector: 'app-date-log',
  templateUrl: './date-log.component.html',
  styleUrls: ['./date-log.component.scss']
})
export class DateLogComponent implements OnInit {
  days: string[] = ['Sun', 'Mon', 'Tue', 'Wed', 'Thu', 'Fri', 'Sat', 'Total'];
  time: string[] = ['0:00', '8:00', '8:00', '8:00', '8:00', '8:00', '0:00', '40:00'];
  monthsName: string[] = ['Jan', 'Feb', 'Mar', 'April', 'May', 'Jun', 'Jul',
  'Aug', 'Sep', 'Oct', 'Nov', 'Dec'];
  firstDate;
  lastDate;
  firstWeekDate;
  firstWeekMonth;
  lastWeekDate;
  lastWeekMonth;
  currentDate: Date;
  chosenDate: Date;
  constructor() { }

  ngOnInit() {
    let curr = new Date();
    this.currentDate = new Date(curr);
    this.chosenDate = new Date(curr);
    let curr1 = new Date(curr);
    let curr2 = new Date(curr);
    let first = curr.getDate() - curr.getDay();
    let last = first + 6;

    this.firstDate = new Date(curr1.setDate(first));
    this.lastDate = new Date(curr2.setDate(last));

    this.firstWeekDate = this.firstDate.getDate();
    this.firstWeekMonth = this.monthsName[this.firstDate.getMonth()];
    this.lastWeekDate = this.lastDate.getDate();
    this.lastWeekMonth = this.monthsName[this.lastDate.getMonth()];

  }

  prevWeek() {
    let pre = this.currentDate.getDate() - 7;
    let curr = new Date(this.currentDate.setDate(pre));
    let curr1 = new Date(curr);
    let curr2 = new Date(curr);
    let first = curr.getDate() - curr.getDay();
    let last = first + 6;

    this.firstDate = new Date(curr1.setDate(first));
    this.lastDate = new Date(curr2.setDate(last));

    this.firstWeekDate = this.firstDate.getDate();
    this.firstWeekMonth = this.monthsName[this.firstDate.getMonth()];
    this.lastWeekDate = this.lastDate.getDate();
    this.lastWeekMonth = this.monthsName[this.lastDate.getMonth()];
  }

  nextWeek() {
    let pre = this.currentDate.getDate() + 7;
    let curr = new Date(this.currentDate.setDate(pre));
    let curr1 = new Date(curr);
    let curr2 = new Date(curr);
    let first = curr.getDate() - curr.getDay();
    let last = first + 6;

    this.firstDate = new Date(curr1.setDate(first));
    this.lastDate = new Date(curr2.setDate(last));

    this.firstWeekDate = this.firstDate.getDate();
    this.firstWeekMonth = this.monthsName[this.firstDate.getMonth()];
    this.lastWeekDate = this.lastDate.getDate();
    this.lastWeekMonth = this.monthsName[this.lastDate.getMonth()];
  }

}
