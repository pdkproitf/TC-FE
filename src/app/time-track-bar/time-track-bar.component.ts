import { Timer, TimerPost } from './../models/timer';
import { TimerService } from './../services/timer-service';
import { Component, OnInit } from '@angular/core';
import { Observable, Subscription } from 'rxjs/Rx';

@Component({
  selector: 'app-time-track-bar',
  templateUrl: './time-track-bar.component.html',
  styleUrls: ['./time-track-bar.component.scss']
})
export class TimeTrackBarComponent implements OnInit {
  classBtn: String = 'play-btn';
  startTime: String = '00:00';
  timeCount: String = '00:00:00';
  ticks: number = -1;
  // timer: Observable<Object>;
  sub: Subscription;
  myVar;
  classDrop: string[] = ['hidden', 'hidden'];
  timer: Timer = new Timer();
  timerPost: TimerPost = new TimerPost();
  startResult: string;
  stopResult: string;
  constructor(private timerService: TimerService) { }

  ngOnInit() {

  }

  changeClass(): void {
    let current = new Date();
    let hoursString = current.getHours() < 10 ? '0' + current.getHours().toString() : current.getHours().toString();
    let minutesString = current.getMinutes() < 10 ? '0' + current.getMinutes().toString() : current.getMinutes().toString();
    this.startTime = hoursString + ':' + minutesString;
    if (this.classBtn === 'play-btn') {
      // this.sub = this.timer.subscribe(t => this.tickerFunc(t));
      this.setStartTime();
      this.ticks = -1;
      this.myTickerFunc();
      this.myVar = setInterval(() => {
        this.myTickerFunc();
      }
      , 1000);
    }else {
      // this.stopTimer();
      this.myStopTimer();
      this.setStopTime();
    }
    this.classBtn = this.classBtn === 'play-btn' ? 'stop-btn' : 'play-btn';
  }

  /*tickerFunc(tick) {
    this.ticks = tick;
    this.secondToTime();
  }

  stopTimer() {
    this.sub.unsubscribe();
  }*/

  myTickerFunc() {
    this.ticks += 1;
    this.secondToTime();
  }

  myStopTimer() {
    clearInterval(this.myVar);
  }

  secondToTime() {
    let sec_num = this.ticks;
    let hours   = Math.floor(sec_num / 3600);
    let minutes = Math.floor((sec_num - (hours * 3600)) / 60);
    let seconds = sec_num - (hours * 3600) - (minutes * 60);
    let hoursString = hours.toString();
    let minutesString = minutes.toString();
    let secondsString = seconds.toString();
    if (hours   < 10) {hoursString   = '0' + hoursString; }
    if (minutes < 10) {minutesString = '0' + minutesString; }
    if (seconds < 10) {secondsString = '0' + secondsString; }
    this.timeCount = hoursString + ':' + minutesString + ':' + secondsString;
  }

  onFocus(num: number) {
    console.log('focus');
    if (num === 0) {
      this.classDrop[num] = 'dropdown div-des';
    }else if (num === 1) {
      this.classDrop[num] = 'dropdown div-task';
    }
  }

  onBlur(num: number) {
    console.log('blur');
    this.classDrop[num] = 'hidden';
  }

  setStartTime() {
    let curr = new Date();
    this.timer.start_time = curr.toString();
  }

  setStopTime() {
    let curr = new Date();
    this.timer.stop_time = curr.toString();
    this.timerPost.timer = this.timer;
    this.timerService.addNewTimer(this.timerPost)
    .then(res => {
      console.log(res);
      let start = new Date(res.start_time);
      let stop = new Date(res.stop_time);
      console.log(start);
      console.log(stop);
      this.startResult = start.getHours().toString() + ':' + start.getMinutes().toString() + ':' + start.getSeconds().toString();
      this.stopResult = stop.getHours().toString() + ':' + stop.getMinutes().toString() + ':' + stop.getSeconds().toString();
    })
    .catch(err => {
      console.log(err);
    });
  }
}
