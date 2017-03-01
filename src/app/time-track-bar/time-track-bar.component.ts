import { TimerFetch } from './../models/timer-fetch';
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
  options: string[] = ['5 min ago', '10 min ago', '15 min ago', '30 min ago', 'End of last timer'];
  _currentCategory: CategoryInProject;
  emptyCategory = new CategoryInProject();
  taskString = '';
  description = '';
  taskColor = '';
  startDateTime: Date;
  lastEndDateTime: Date;
  optionStartTime: Date[] = [new Date(), new Date(), new Date(), new Date(), new Date()];

  @Input()
  set currentCategory(curCat) {
    if (this.description === '' && this.taskString === '' && this.classBtn === 'stop-btn') {
      this._currentCategory = curCat;
      this.taskString = this.currentCategory.project + ' - ' + this.currentCategory.category;
      this.taskColor = this.currentCategory.color;
    } else if (curCat.category !== undefined && curCat.project !== undefined) {
      if (this.classBtn === 'stop-btn') {
      this.changeClass();
    }
      this.changeClass();
      this._currentCategory = curCat;
      this.taskString = this.currentCategory.project + ' - ' + this.currentCategory.category;
      this.taskColor = this.currentCategory.color;
    }
  }
  get currentCategory() {
    return this._currentCategory;
  }
  @Input()
  set projectJoins(arg) {
    this._projectJoins = arg;
    this.filterProjectJoin('');
  }
  get projectJoins() {
    return this._projectJoins;
  }
  _projectJoins: ProjectJoin[];
  projectJoinsSearch: ProjectJoin[];
  varTimeOut;
  @Output()
  outCategory = new EventEmitter<CategoryInProject>();
  @Output()
  addedTimer = new EventEmitter<TimerFetch>();
  myVar;
  classDrop: string[] = ['hidden', 'hidden', 'hidden'];
  timer: Timer = new Timer();
  timerPost: TimerPost = new TimerPost();
  @Input()
  set recentTasks(arg) {
    this._recentTasks = arg;
    this.filterRecentTasks('');
  }
  get recentTasks() {
    return this._recentTasks;
  }
  _recentTasks: TimerFetch[] = [];
  recentTasksSearch: TimerFetch[];
  constructor(private timerService: TimerService) { }

  ngOnInit() {
    this._currentCategory = this.emptyCategory;
  }

  changeClass(): void {
    if (this.classBtn === 'play-btn') {
      this.setStartTime();
      this.ticks = -1;
      this.myTickerFunc();
      this.myVar = setInterval(() => {
        this.myTickerFunc();
      }
      , 1000);
      window.scrollTo(0, 0);
    }else {
      this.myStopTimer();
      this.setStopTime();
      this.description = '';
      this.taskString = '';
      this.taskColor = '';
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
      this.filterRecentTasks(this.description);
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
    this.startDateTime = curr;
    this.timeToString();
    this.generateOptions();
  }

  setStopTime() {
    this.timer.start_time = this.startDateTime.toString();
    let curr = new Date();
    this.lastEndDateTime = curr;
    this.timer.stop_time = curr.toString();
    this.timer.category_member_id = this._currentCategory.category_member_id;
    this.timer.task_name = this.description;
    this.timerPost.timer = this.timer;
    console.log(this.timerPost);
    this.timerService.addNewTimer(this.timerPost)
    .then(res => {
      console.log(res);
      this.addedTimer.emit(res);
      this.currentCategory = this.emptyCategory;
    })
    .catch(err => {
      console.log(err);
    });
  }

  selectCategory(arg) {
    this.outCategory.emit(arg);
  }

  generateOptions() {
    let five = 5 * 60000;
    let ten = 10 * 60000;
    let fifteen = 15 * 60000;
    let thirdty = 30 * 60000;
    this.optionStartTime[0] = new Date(this.startDateTime.getTime() - five);
    this.optionStartTime[1] = new Date(this.startDateTime.getTime() - ten);
    this.optionStartTime[2] = new Date(this.startDateTime.getTime() - fifteen);
    this.optionStartTime[3] = new Date(this.startDateTime.getTime() - thirdty);
    if (this.lastEndDateTime != null) {
      this.optionStartTime[4] = this.lastEndDateTime;
    }
  }

  updateStartTime(id) {
    let difference = this.startDateTime.getTime() - this.optionStartTime[id].getTime();
    difference /= 1000;
    difference = Math.round(difference);
    this.startDateTime = this.optionStartTime[id];
    let current = this.startDateTime;
    let hoursString = current.getHours() < 10 ? '0' + current.getHours().toString() : current.getHours().toString();
    let minutesString = current.getMinutes() < 10 ? '0' + current.getMinutes().toString() : current.getMinutes().toString();
    this.startTime = hoursString + ':' + minutesString;
    this.ticks += difference;
    this.secondToTime();
    this.generateOptions();
    // this.timer.start_time = this.startDateTime.toString();
  }

  getTimerFetchStart(arg) {
    console.log(arg);
    if (this.classBtn === 'stop-btn') {
      this.changeClass();
    }
    this.changeClass();
    this.taskString = arg.project_name + ' - ' + arg.category_name;
    this.timer.task_id = arg.task.id;
    this.description = arg.task.name;
  }

  filterProjectJoin(arg: string) {
    this.projectJoinsSearch = [];
    for (let project of this.projectJoins) {
      if (project.name.indexOf(arg) > -1) {
        this.projectJoinsSearch.push(project);
      }
    }
  }

  doFilter() {
    clearTimeout(this.varTimeOut);
    this.varTimeOut = setTimeout(() => this.filterProjectJoin(this.taskString), 2000);
  }

  filterRecentTasks(arg: string) {
    this.recentTasksSearch = [];
    for (let task of this.recentTasks) {
      if (task.task.name.indexOf(arg) > -1) {
        this.recentTasksSearch.push(task);
      }
    }
  }

  doFilter0() {
    clearTimeout(this.varTimeOut);
    this.varTimeOut = setTimeout(() => this.filterRecentTasks(this.description), 2000);
  }

  setTime(arg) {
    console.log(this.startTime);
    this.stringToTime();
  }

  timeToString() {
    let hours = this.startDateTime.getHours();
    let hoursString = (hours < 10) ? '0' + hours.toString() : hours.toString();
    let minutes = this.startDateTime.getMinutes();
    let minutesString = (minutes < 10) ? '0' + minutes.toString() : minutes.toString();
    this.startTime = hoursString + ':' + minutesString;
  }

  stringToTime() {
    let timeValue = this.startTime.split(':');
    let old = this.startDateTime.getTime();
    let hours = parseInt(timeValue[0], 10);
    let minutes = parseInt(timeValue[1], 10);
    this.startDateTime.setHours(hours);
    this.startDateTime.setMinutes(minutes);
    let neww = this.startDateTime.getTime();
    let diff = -neww + old;
    diff /= 1000;
    diff = Math.round(diff);
    this.ticks += diff;
    this.secondToTime();
    this.generateOptions();
  }
}
