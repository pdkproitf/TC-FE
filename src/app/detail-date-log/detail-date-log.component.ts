import { TimerFetch } from './../models/timer-fetch';
import { TimerFetchService } from './../services/timer-fetch-service';
import { Component, OnInit, Input } from '@angular/core';

@Component({
  selector: 'app-detail-date-log',
  templateUrl: './detail-date-log.component.html',
  styleUrls: ['./detail-date-log.component.scss']
})
export class DetailDateLogComponent implements OnInit {
  days: string[] = ['Sun', 'Mon', 'Tue', 'Wed', 'Thu', 'Fri', 'Sat', 'Total'];
  classDay: string[] = ['', '', '', '', '', '', '', '', ''];
  time: string[] = ['0:00', '8:00', '8:00', '8:00', '8:00', '8:00', '0:00', '40:00'];
  fullWeekTimer;
  currentTimers;
  firstWeekDay: Date;
  lastWeekDay: Date;
  firstString: string;
  lastString: string;
  _weekAnchor: Date[] = [];
  @Input()
  set weekAnchor(arg) {
    this._weekAnchor = arg;
    this.firstWeekDay = arg[0];
    this.lastWeekDay = arg[1];
    this.firstString = this.dateToShortString(this.firstWeekDay);
    this.lastString = this.dateToShortString(this.lastWeekDay);

    let curr = new Date();
    let number = curr.getDay();
    let firstDateTmp = new Date(this.firstWeekDay);
    let chosenDate = new Date(firstDateTmp.setDate(this.firstWeekDay.getDate() + number));
    this.timerFetchService.getTimerFetch(this.firstString, this.lastString)
    .then(res => {
      this.fullWeekTimer = res;
      let chooseString = this.dateToShortString(chosenDate);
      this.currentTimers = this.fullWeekTimer[chooseString];
    })
    .catch(err => {
      console.log(err);
    });
  }
  get weekAnchor() {
    return this._weekAnchor;
  }
  constructor(private timerFetchService: TimerFetchService) { }

  ngOnInit() {
    let curr = new Date();
    let curr1 = new Date();
    let curr2 = new Date();
    this.classDay[curr.getDay()] = 'active';
    let first = curr1.getDate() - curr1.getDay();
    this.firstWeekDay = new Date(curr1.setDate(first));
    this.lastWeekDay = new Date(curr2.setDate(first + 6));
    this.firstString = this.dateToShortString(this.firstWeekDay);
    this.lastString = this.dateToShortString(this.lastWeekDay);
    this.timerFetchService.getTimerFetch(this.firstString, this.lastString)
    .then(res => {
      this.fullWeekTimer = res;
      let chooseString = this.dateToShortString(curr);
      this.currentTimers = this.fullWeekTimer[chooseString];
    })
    .catch(err => {
      console.log(err);
    });
  }

  setActiveDay(a) {
    for (let i = 0; i < 8; i++) {
      if ( i !== a) {
        this.classDay[i] = '';
      }
    }
    let day = this.firstWeekDay.getDate() + a;
    let chosenDate = new Date();
    chosenDate.setDate(day);
    console.log(chosenDate);
    let chosenString = this.dateToShortString(chosenDate);
    this.currentTimers = this.fullWeekTimer[chosenString];
    this.classDay[a] = 'active';
  }

  dateToShortString(date: Date): string {
    let yearString = date.getFullYear().toString();
    let monthString = ((date.getMonth() + 1) < 10) ? '0' + (date.getMonth() + 1).toString() : (date.getMonth() + 1).toString();
    let dateString = (date.getDate() < 10) ? '0' + date.getDate().toString() : date.getDate().toString();
    let res = yearString + '-' + monthString + '-' + dateString;
    return res;
  }

  setDate(arg: Date) {
    for (let i = 0; i < 8; i++) {
      this.classDay[i] = '';
    }
    let curr = arg;
    let curr1 = new Date(curr);
    let curr2 = new Date(curr);
    this.classDay[curr.getDay()] = 'active';
    let first = curr1.getDate() - curr1.getDay();
    this.firstWeekDay = new Date(curr1.setDate(first));
    this.lastWeekDay = new Date(curr2.setDate(first + 6));
    this.firstString = this.dateToShortString(this.firstWeekDay);
    this.lastString = this.dateToShortString(this.lastWeekDay);
    this.timerFetchService.getTimerFetch(this.firstString, this.lastString)
    .then(res => {
      this.fullWeekTimer = res;
      let chooseString = this.dateToShortString(curr);
      this.currentTimers = this.fullWeekTimer[chooseString];
    })
    .catch(err => {
      console.log(err);
    });
  }

}
