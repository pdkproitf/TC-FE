import { TimerFetchService } from '../../services/timer-fetch-service';
import { Component, OnInit, Output, Input, EventEmitter, ViewChild } from '@angular/core';

@Component({
  selector: 'app-date-log',
  templateUrl: './date-log.component.html',
  styleUrls: ['./date-log.component.scss']
})
export class DateLogComponent implements OnInit {
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
  @Output()
  outDates = new EventEmitter<Date[]>();
  @Output()
  outSpecificDate = new EventEmitter<Date>();
  @Input()
  set startWeekDay(value) {
    this._startWeekDay = value;
    this.thisWeek();
  }
  get startWeekDay() {
    return this._startWeekDay;
  }
  _startWeekDay = 0;
  @ViewChild('calendar')calendar;
  constructor(private timerFetchService: TimerFetchService) { }

  ngOnInit() {
    this.thisWeek();
  }
  thisWeek() {
    let curr = new Date();
    this.currentDate = new Date(curr);
    this.chosenDate = new Date(curr);
    let curr1 = new Date(curr);
    let curr2 = new Date(curr);
    console.log(this.startWeekDay);
    let first = curr.getDate() - curr.getDay() + this.startWeekDay;
    let last = first + 6;

    this.firstDate = new Date(curr1.setDate(first));
    this.lastDate = new Date(curr2.setDate(last));

    this.outDates.emit([this.firstDate, this.lastDate]);

    this.firstWeekDate = this.firstDate.getDate();
    this.firstWeekMonth = this.monthsName[this.firstDate.getMonth()];
    this.lastWeekDate = this.lastDate.getDate();
    this.lastWeekMonth = this.monthsName[this.lastDate.getMonth()];
  }

  prevWeek() {
    let pre = this.currentDate.getDate() - 7;
    this.chosenDate.setDate(pre);
    console.log(this.chosenDate);
    let curr = new Date(this.currentDate.setDate(pre));

    let curr1 = new Date(curr);
    let curr2 = new Date(curr);
    let first = curr.getDate() - curr.getDay() + this.startWeekDay;
    if (curr.getDay() === 0 && this._startWeekDay === 1){
      first -= 7;
    }
    let last = first + 6;

    this.firstDate = new Date(curr1.setDate(first));
    this.lastDate = new Date(curr2.setDate(last));

    this.outDates.emit([this.firstDate, this.lastDate]);

    this.firstWeekDate = this.firstDate.getDate();
    this.firstWeekMonth = this.monthsName[this.firstDate.getMonth()];
    this.lastWeekDate = this.lastDate.getDate();
    this.lastWeekMonth = this.monthsName[this.lastDate.getMonth()];
    this.calendar.inputFieldValue = this.dateToDMY(this.chosenDate);
  }

  nextWeek() {
    let pre = this.currentDate.getDate() + 7;
    this.chosenDate.setDate(pre);
    console.log(this.chosenDate);
    let curr = new Date(this.currentDate.setDate(pre));

    let curr1 = new Date(curr);
    let curr2 = new Date(curr);
    let first = curr.getDate() - curr.getDay() + this.startWeekDay;
    if (curr.getDay() === 0 && this._startWeekDay === 1){
      first -= 7;
    }
    let last = first + 6;

    this.firstDate = new Date(curr1.setDate(first));
    this.lastDate = new Date(curr2.setDate(last));

    this.outDates.emit([this.firstDate, this.lastDate]);

    this.firstWeekDate = this.firstDate.getDate();
    this.firstWeekMonth = this.monthsName[this.firstDate.getMonth()];
    this.lastWeekDate = this.lastDate.getDate();
    this.lastWeekMonth = this.monthsName[this.lastDate.getMonth()];
    this.calendar.inputFieldValue = this.dateToDMY(this.chosenDate);
  }

  emitChosenDate(arg) {
    // console.log(this.chosenDate);
    this.currentDate = new Date(this.chosenDate);
    this.outSpecificDate.emit(this.currentDate);
    this.generateTheWeekForTheDate();
  }

  emitChosenDate0(arg) {
    if (JSON.stringify(this.currentDate) === JSON.stringify(this.chosenDate)) {
      return;
    }else {
      // console.log(this.chosenDate);
      this.currentDate = new Date(this.chosenDate);
      this.outSpecificDate.emit(this.currentDate);
      this.generateTheWeekForTheDate();
    }
  }

  generateTheWeekForTheDate() {
    let curr = new Date(this.chosenDate);
    let curr1 = new Date(curr);
    let curr2 = new Date(curr);
    let first = curr.getDate() - curr.getDay() + this.startWeekDay;
    if (curr.getDay() === 0 && this._startWeekDay === 1){
      first -= 7;
    }
    let last = first + 6;
    this.firstDate = new Date(curr1.setDate(first));
    this.lastDate = new Date(curr2.setDate(last));

    this.firstWeekDate = this.firstDate.getDate();
    this.firstWeekMonth = this.monthsName[this.firstDate.getMonth()];
    this.lastWeekDate = this.lastDate.getDate();
    this.lastWeekMonth = this.monthsName[this.lastDate.getMonth()];
  }
  dateToDMY(date: Date): string{
    let dateString = (date.getDate() < 10) ? '0' + date.getDate().toString() : date.getDate().toString();
    let monthString = (date.getMonth() + 1 < 10) ? '0' + (date.getMonth() + 1).toString() : (date.getMonth() + 1).toString();
    let yearString = date.getFullYear().toString();
    return dateString + '/' + monthString + '/' + yearString;
  }
  setDateField(date: Date){
    this.calendar.inputFieldValue = this.dateToDMY(date);
  }

}
