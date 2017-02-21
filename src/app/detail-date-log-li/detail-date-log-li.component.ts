import { TimerService } from './../services/timer-service';
import { TimerFetch } from './../models/timer-fetch';
import { Component, OnInit, Input, Output, EventEmitter } from '@angular/core';

@Component({
  selector: 'app-detail-date-log-li',
  templateUrl: './detail-date-log-li.component.html',
  styleUrls: ['./detail-date-log-li.component.scss']
})
export class DetailDateLogLiComponent implements OnInit {
  spanClass = 'hidden';
  _timerFetch: TimerFetch = new TimerFetch();
  @Input()
  set timerFetch(value) {
    this._timerFetch = value;
    this.secondToTime();
    this.from = this.convertTime(this.timerFetch.start_time);
    this.to = this.convertTime(this.timerFetch.stop_time);
  }
  get timerFetch() {
    return this._timerFetch;
  }
  @Output()
  emitDelete = new EventEmitter();
  @Output()
  emitStart = new EventEmitter<TimerFetch>();
  from;
  to;
  total;
  constructor(private timerService: TimerService) { }

  ngOnInit() {
  }

  showSpan() {
    this.spanClass = 'aaa';
  }

  hideSpan() {
    this.spanClass = 'hidden';
  }

  convertTime(dateString) {
    let date = new Date(dateString);
    let hourString = date.getHours().toString();
    let minuteString = date.getMinutes().toString();
    let res = hourString + ':' + minuteString;
    return res;
  }

  totalTime(): number {
    let from = new Date(this.timerFetch.start_time).getTime();
    let to = new Date(this.timerFetch.stop_time).getTime();
    return (to - from) / 1000;
  }

  secondToTime() {
    let sec_num = this.totalTime();
    let hours   = Math.floor(sec_num / 3600);
    let minutes = Math.floor((sec_num - (hours * 3600)) / 60);
    let seconds = sec_num - (hours * 3600) - (minutes * 60);
    let hoursString = hours.toString();
    let minutesString = minutes.toString();
    let secondsString = seconds.toString();
    if (hours   < 10) {hoursString   = '0' + hoursString; }
    if (minutes < 10) {minutesString = '0' + minutesString; }
    if (seconds < 10) {secondsString = '0' + secondsString; }
    this.total = hoursString + ':' + minutesString + ':' + secondsString;
  }

  deleteTimer() {
    this.timerService.deleteTimer(this.timerFetch.id)
    .then(res => {
      this.emitDelete.emit(res);
    })
    .catch(err => {
      console.log(err);
    });
  }

  startTimer() {
    this.emitStart.emit(this.timerFetch);
  }
}
