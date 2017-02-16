import { TimerFetch } from './../models/timer-fetch';
import { Component, OnInit, Input } from '@angular/core';

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
    this.totalTime();
    this.from = this.convertTime(this.timerFetch.start_time);
    this.to = this.convertTime(this.timerFetch.stop_time);
  }
  get timerFetch() {
    return this._timerFetch;
  }
  from;
  to;
  total;
  constructor() { }

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

  totalTime() {
    let from = new Date(this.timerFetch.start_time).getTime();
    let to = new Date(this.timerFetch.stop_time).getTime();
    this.total = (to - from) / 1000;
  }
}
