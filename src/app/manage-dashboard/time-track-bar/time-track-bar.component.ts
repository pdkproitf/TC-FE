import { Task } from '../../models/task';
import { TimerFetch } from '../../models/timer-fetch';
import { ProjectJoin } from '../../models/project-join';
import { CategoryInProject } from '../../models/category-in-project';
import { Timer, TimerPost } from '../../models/timer';
import { TimerService } from '../../services/timer-service';
import { Component, OnInit, OnDestroy, Input, Output, EventEmitter } from '@angular/core';
import { Observable, Subscription } from 'rxjs/Rx';
import { Message } from 'primeng/primeng';

@Component({
  selector: 'app-time-track-bar',
  templateUrl: './time-track-bar.component.html',
  styleUrls: ['./time-track-bar.component.scss']
})
export class TimeTrackBarComponent implements OnInit, OnDestroy {
  msgs: Message[] = [];
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
  @Output()
  emitLoading = new EventEmitter<boolean>();
  @Input()
  set currentCategory(curCat: CategoryInProject) {
    if (this.description === '' && this.taskString === '' && this.classBtn === 'stop-btn') {
      this._currentCategory = curCat;
      this.taskString = this.currentCategory.project + ' - ' + this.currentCategory.category;
      this.taskColor = this.currentCategory.color;
      window.scrollTo(0, 0);
    } else if (curCat.category !== undefined && curCat.project !== undefined) {
      if (this.classBtn === 'stop-btn') {
      this.changeClass();
    }
      this.changeClass();
      this._currentCategory = curCat;
      this.taskString = this.currentCategory.project + ' - ' + this.currentCategory.category;
      this.taskColor = this.currentCategory.color;
    }
    let i = this.doesHaveRecentTask(curCat);
    if (i > -1) {
      this.timer.task_id = this.recentTasks[i].id;
      this.timer.task_name = this.recentTasks[i].name;
      this.description = this.recentTasks[i].name;
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
    console.log(this.recentTasks);
  }
  get recentTasks() {
    return this._recentTasks;
  }
  _recentTasks: Task[] = [];
  recentTasksSearch: Task[];
  constructor(private timerService: TimerService) { }

  ngOnInit() {
    this._currentCategory = this.emptyCategory;
    window.onbeforeunload = (function (event) {
      let e = event || window.event;
      if (e) {
        this.saveLocalTimer();
      }else {
        this.saveLocalTimer();
      }
    }).bind(this);
    this.loadLocalTimer();
  }

  ngOnDestroy() {
    this.saveLocalTimer();
  }

  saveLocalTimer() {
    if (this.classBtn === 'stop-btn') {
      this.timer.start_time = this.startDateTime.toString();
      let curr = new Date();
      this.timer.category_member_id = this._currentCategory.category_member_id;
      if (this.description !== this.timer.task_name) {
        this.timer.task_id = null;
      }
      this.timer.task_name = this.description;
      localStorage.setItem('timer', JSON.stringify(this.timer));
      localStorage.setItem('taskString', this.taskString);
      localStorage.setItem('taskColor', this.taskColor);
    } else {
      let timer = localStorage.getItem('timer');
      if (timer != null) {
        localStorage.removeItem('timer');
        localStorage.removeItem('taskString');
        localStorage.removeItem('taskColor');
      }
    }
    clearInterval(this.myVar);
  }

  loadLocalTimer() {
    let timerInfo = localStorage.getItem('timer');
    if (timerInfo != null) {
      let timer = JSON.parse(timerInfo);
      this.timer = timer;
      if (timer.category_member_id != null){
        this._currentCategory.category_member_id = timer.category_member_id;
      }
      this.startDateTime = new Date(timer.start_time);
      this.timeToString();
      this.generateOptions();
      this.description = timer.task_name;
      let curr = new Date();
      this.ticks = Math.round((curr.getTime() - this.startDateTime.getTime()) / 1000);
      clearInterval(this.myVar);
      this.myVar = setInterval(() => {
        this.myTickerFunc();
      }, 1000);
      this.taskString = localStorage.getItem('taskString');
      this.taskColor = localStorage.getItem('taskColor');
      window.scrollTo(0, 0);
      this.classBtn = 'stop-btn';
    }
  }

  changeClass(): void {
    if (this.classBtn === 'play-btn') {
      this.setStartTime();
      this.ticks = -1;
      this.myTickerFunc();
      clearInterval(this.myVar);
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
      this._currentCategory.category_member_id = null;
      this.timer = new Timer();
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
    if (num === 0) {
      window.open('https://www.google.com');
    }
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
    if (this.description !== this.timer.task_name) {
      this.timer.task_id = null;
    }
    this.timer.task_name = this.description;
    this.timerPost.timer = this.timer;
    this.emitLoading.emit(true);
    this.timerService.addNewTimer(this.timerPost)
    .then(res => {
      console.log(res);
      this.addedTimer.emit(res);
      this._currentCategory = this.emptyCategory;
      let content = 'New Time Tracked';
      this.msgs = [];
      this.msgs.push({severity: 'success', summary: 'Success', detail: content});
      this.emitLoading.emit(false);
    })
    .catch(err => {
      let content = JSON.parse(err['_body']).error;
      this.msgs = [];
      this.msgs.push({severity: 'error', summary: 'Error', detail: content});
      this.emitLoading.emit(false);
    });
  }

  selectCategory(arg: CategoryInProject) {
    this._currentCategory = arg;
    this.taskString = this.currentCategory.project + ' - ' + this.currentCategory.category;
    this.taskColor = this.currentCategory.color;
    this.timer.task_id = null;
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
    this.timer.task_name = arg.task.name;
    this.currentCategory.category_member_id = arg.category_member_id;
    this.description = arg.task.name;
    this.taskColor = arg.background;
  }

  getTaskStart(arg) {
    console.log(arg);
    if (this.classBtn === 'stop-btn') {
      this.changeClass();
    }
    this.changeClass();
    this.taskColor = arg.background;
    this.timer.task_id = arg.id;
    this.timer.task_name = arg.name;
    this._currentCategory.category_member_id = arg.category_member_id;
    this.description = arg.name;
    this.taskString = arg.project_name + ' - ' + arg.category_name;
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
    this.varTimeOut = setTimeout(() => this.filterProjectJoin(this.taskString), 500);
  }

  filterRecentTasks(arg: string) {
    this.recentTasksSearch = [];
    for (let task of this.recentTasks) {
      if (task.name.indexOf(arg) > -1) {
        this.recentTasksSearch.push(task);
      }
    }
  }

  doFilter0() {
    clearTimeout(this.varTimeOut);
    this.varTimeOut = setTimeout(() => this.filterRecentTasks(this.description), 500);
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

  doesHaveRecentTask(curCat: CategoryInProject): number {
    console.log(curCat);
    let len = this.recentTasks.length;
    for (let i = 0; i < len; i++) {
      let recentTask = this.recentTasks[i];
      if (curCat.category === recentTask.category_name && curCat.project === recentTask.project_name) {
        return i;
      }
    }
    return -1;
  }
}
