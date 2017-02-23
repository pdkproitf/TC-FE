import { TimerFetch } from './../models/timer-fetch';
import { TimerFetchService } from './../services/timer-fetch-service';
import { Component, OnInit, Input, Output, EventEmitter } from '@angular/core';

@Component({
  selector: 'app-detail-date-log',
  templateUrl: './detail-date-log.component.html',
  styleUrls: ['./detail-date-log.component.scss']
})
export class DetailDateLogComponent implements OnInit {
  days: string[] = ['Sun', 'Mon', 'Tue', 'Wed', 'Thu', 'Fri', 'Sat', 'Total'];
  classDay: string[] = ['', '', '', '', '', '', '', '', ''];
  time: string[] = ['00:00:00', '00:00:00', '00:00:00', '00:00:00', '00:00:00', '00:00:00', '00:00:00', '00:00:00'];
  timeSeconds = [0, 0, 0, 0, 0, 0, 0, 0];
  fullWeekTimer;
  currentTimers: TimerFetch[] = [];
  firstWeekDay: Date;
  lastWeekDay: Date;
  firstString: string;
  lastString: string;
  currentDateString: string;
  _weekAnchor: Date[] = [];
  @Output()
  emitStart = new EventEmitter<TimerFetch>();
  @Input()
  set weekAnchor(arg) {
    this._weekAnchor = arg;
    this.firstWeekDay = arg[0];
    this.lastWeekDay = arg[1];
    this.firstString = this.dateToShortString(this.firstWeekDay);
    this.lastString = this.dateToShortString(this.lastWeekDay);

    let curr = new Date();
    this.currentDateString = this.dateToShortString(curr);
    let number = curr.getDay();
    let firstDateTmp = new Date(this.firstWeekDay);
    let chosenDate = new Date(firstDateTmp.setDate(this.firstWeekDay.getDate() + number));
    this.timerFetchService.getTimerFetch(this.firstString, this.lastString)
    .then(res => {
      this.fullWeekTimer = res;
      let chooseString = this.dateToShortString(chosenDate);
      this.currentTimers = this.fullWeekTimer[chooseString];
      this.generateTotalTime();
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
      if (this.fullWeekTimer[chooseString] === undefined) {
        this.fullWeekTimer[chooseString] = [];
      }
      this.currentTimers = this.fullWeekTimer[chooseString];
      this.generateTotalTime();
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
    if (this.fullWeekTimer[chosenString] === undefined) {
      this.fullWeekTimer[chosenString] = [];
    }
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
      if (this.fullWeekTimer[chooseString] === undefined) {
        this.fullWeekTimer[chooseString] = [];
      }
      this.currentTimers = this.fullWeekTimer[chooseString];
    })
    .catch(err => {
      console.log(err);
    });
    this.generateTotalTime();
  }

  onDelete(id) {
    this.currentTimers.splice(id, 1);
    this.generateTotalTime();
  }

  addTimer(arg) {
    if (this.fullWeekTimer[this.currentDateString] === undefined) {
      console.log(this.fullWeekTimer[this.currentDateString]);
    } else {
      this.fullWeekTimer[this.currentDateString].unshift(arg);
    }
    this.generateTotalTime();
  }

  onStart(arg) {
    this.emitStart.emit(arg);
  }

  generateTotalTime() {
    for ( let i = 0; i < 8; i++) {
      this.timeSeconds[i] = 0;
      this.time[i] = '00:00:00';
    }
    for ( let i = 0; i < 7; i++) {
      let date = new Date(this.firstWeekDay);
      date.setDate(this.firstWeekDay.getDate() + i);
      let stringDate = this.dateToShortString(date);
      let arrayTimer = this.fullWeekTimer[stringDate];
      this.timeSeconds[i] = this.totalTimeInDate(arrayTimer);
      this.timeSeconds[7] += this.timeSeconds[i];
      this.time[i] = this.secondToTime(this.timeSeconds[i]);
    }
    this.time[7] = this.secondToTime(this.timeSeconds[7]);
  }

  totalTimeInDate(arrayTimer: TimerFetch[]) {
    let result = 0;
    if (arrayTimer === undefined || arrayTimer == null) {
      return result;
    }else {
      let len = arrayTimer.length;
      for (let i = 0; i < len; i++) {
        let start = new Date(arrayTimer[i].start_time).getTime();
        let stop = new Date(arrayTimer[i].stop_time).getTime();
        let diff = stop - start;
        diff /= 1000;
        diff = Math.round(diff);
        result += diff;
      }
    return result;
    }
  }

  secondToTime(ticks): string {
    let sec_num = ticks;
    let hours   = Math.floor(sec_num / 3600);
    let minutes = Math.floor((sec_num - (hours * 3600)) / 60);
    let seconds = sec_num - (hours * 3600) - (minutes * 60);
    let hoursString = hours.toString();
    let minutesString = minutes.toString();
    let secondsString = seconds.toString();
    if (hours   < 10) {hoursString   = '0' + hoursString; }
    if (minutes < 10) {minutesString = '0' + minutesString; }
    if (seconds < 10) {secondsString = '0' + secondsString; }
    return hoursString + ':' + minutesString + ':' + secondsString;
  }
}
