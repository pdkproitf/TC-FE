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
  currentDate;
  chosenDate;
  constructor() { }

  ngOnInit() {
    let curr = new Date(); // get current date
    this.currentDate = curr;
    this.chosenDate = curr;
    let first = curr.getDate() - curr.getDay(); // First day is the day of the month - the day of the week
    let last = first + 6; // last day is the first day + 6

    this.firstDate = new Date(curr.setDate(first));
    this.lastDate = new Date(curr.setDate(last));

    this.firstWeekDate = this.firstDate.getDate();
    this.firstWeekMonth = this.monthsName[this.firstDate.getMonth()];
    this.lastWeekDate = this.lastDate.getDate();
    this.lastWeekMonth = this.monthsName[this.lastDate.getMonth()];

  }

  prevWeek() {

  }

  nextWeek() {

  }

}
