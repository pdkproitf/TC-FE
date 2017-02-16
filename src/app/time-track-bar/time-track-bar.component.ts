import { ProjectJoin } from './../models/project-join';
import { CategoryInProject } from './../models/category-in-project';
import { Timer, TimerPost } from './../models/timer';
import { TimerService } from './../services/timer-service';
import { Component, OnInit, Input, Output, EventEmitter } from '@angular/core';
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
  _currentCategory: CategoryInProject;
  emptyCategory = new CategoryInProject();
  taskString = '';
  description = '';
  @Input()
  set currentCategory(curCat) {
    if (curCat.category !== undefined && curCat.project !== undefined) {
      if (curCat.pcu_id === this._currentCategory.pcu_id) {
        if (this.classBtn === 'stop-btn') {
          this.changeClass();
        }
        this._currentCategory = this.emptyCategory;
        this.taskString = '';
        return;
      }else {
        if (this.classBtn === 'stop-btn') {
          this.changeClass();
        }
        this._currentCategory = curCat;
        this.taskString = this.currentCategory.project + ' - ' + this.currentCategory.category;
      }
    }
  }
  get currentCategory() {
    return this._currentCategory;
  }
  @Input()
  projectJoins: ProjectJoin[];
  @Output()
  outCategory = new EventEmitter<CategoryInProject>();
  myVar;
  classDrop: string[] = ['hidden', 'hidden', 'hidden'];
  timer: Timer = new Timer();
  timerPost: TimerPost = new TimerPost();

  constructor(private timerService: TimerService) { }

  ngOnInit() {
    this._currentCategory = this.emptyCategory;
  }

  changeClass(): void {
    let current = new Date();
    let hoursString = current.getHours() < 10 ? '0' + current.getHours().toString() : current.getHours().toString();
    let minutesString = current.getMinutes() < 10 ? '0' + current.getMinutes().toString() : current.getMinutes().toString();
    this.startTime = hoursString + ':' + minutesString;
    if (this.classBtn === 'play-btn') {
      this.setStartTime();
      this.ticks = -1;
      this.myTickerFunc();
      this.myVar = setInterval(() => {
        this.myTickerFunc();
      }
      , 1000);
    }else {
      this.myStopTimer();
      this.setStopTime();
    }
    this.classBtn = this.classBtn === 'play-btn' ? 'stop-btn' : 'play-btn';
  }

  myTickerFunc() {
    this.ticks += 1;
    this.secondToTime();
  }

  myStopTimer() {
    clearInterval(this.myVar);
    this.timeCount = '00:00:00';
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
    }else if (num === 2) {
      this.classDrop[num] = 'dropdown div-time';
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
    this.timer.project_category_user_id = this._currentCategory.pcu_id;
    this.timer.task_name = this.description;
    this.timerPost.timer = this.timer;
    console.log(this.timerPost);
    this.timerService.addNewTimer(this.timerPost)
    .then(res => {
      console.log(res);
    })
    .catch(err => {
      console.log(err);
    });
  }

  selectCategory(arg) {
    this.outCategory.emit(arg);
  }
}
