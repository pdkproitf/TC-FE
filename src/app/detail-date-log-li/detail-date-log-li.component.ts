import { Task } from './../models/task';
import { ProjectJoin } from './../models/project-join';
import { TimerService } from './../services/timer-service';
import { TimerFetch } from './../models/timer-fetch';
import { Timer, TimerPut } from './../models/timer';
import { Component, OnInit, Input, Output, EventEmitter } from '@angular/core';
import { Message } from 'primeng/primeng';

@Component({
  selector: 'app-detail-date-log-li',
  templateUrl: './detail-date-log-li.component.html',
  styleUrls: ['./detail-date-log-li.component.scss']
})
export class DetailDateLogLiComponent implements OnInit {
  msgs: Message[] = [];
  spanClass = 'hidden';
  _timerFetch: TimerFetch = new TimerFetch();
  timer: Timer = new Timer();
  timerPut: TimerPut = new TimerPut();
  divClass: string[] = ['hiddenDiv', 'hiddenDiv', 'hiddenDiv'];
  @Input()
  set timerFetch(value) {
    this._timerFetch = value;
    this.total = this.secondToTime(this.totalTime());
    this.totalString = this.total;
    this.startDateEdit = new Date(this.timerFetch.start_time);
    this.endDateEdit = new Date(this.timerFetch.stop_time);
  }
  get timerFetch() {
    return this._timerFetch;
  }
  @Output()
  emitDelete = new EventEmitter();
  @Output()
  emitStart = new EventEmitter<TimerFetch>();
  total;
  @Input()
  projectJoins: ProjectJoin[] = [];
  projectJoinsSearch: ProjectJoin[] = [];
  varTimeOut;
  searchPattern: string;
  editDes: string;
  @Input()
  recentTasks: Task[] = [];
  recentTasksSearch: Task[];

  @Input()
  endLastTimer: Date;
  startString: string;
  endString: string;
  totalString: string;
  startDateEdit: Date;
  endDateEdit: Date;
  miniDiv = ['option hide', 'option hide'];
  strOption = [5, 10, 15, 30];
  startEarlier: Date[] = [];
  startLater: Date[] = [];
  endEarlier: Date[] = [];
  endLater: Date[] = [];

  @Output()
  timeEditedEmit = new EventEmitter<boolean>();
  isTimeEdited: boolean = false;
  constructor(private timerService: TimerService) { }

  ngOnInit() {
    this.projectJoinsSearch = this.projectJoins;
    this.startString = this.timeToString(this.timerFetch.start_time);
    this.endString = this.timeToString(this.timerFetch.stop_time);
    this.generateOptions();
    this.recentTasksSearch = this.recentTasks;
  }

  showSpan() {
    this.spanClass = 'aaa';
  }

  hideSpan() {
    this.spanClass = 'hidden';
  }

  totalTime(): number {
    let from = new Date(this.timerFetch.start_time).getTime();
    let to = new Date(this.timerFetch.stop_time).getTime();
    return Math.round((to - from) / 1000);
  }

  secondToTime(totalTime) {
    let sec_num = totalTime;
    console.log(totalTime);
    let hours   = Math.floor(sec_num / 3600);
    let minutes = Math.floor((sec_num - (hours * 3600)) / 60);
    let seconds = sec_num - (hours * 3600) - (minutes * 60);
    let hoursString = hours.toString();
    let minutesString = minutes.toString();
    let secondsString = seconds.toString();
    if (hours   < 10) {hoursString   = '0' + hoursString; }
    if (minutes < 10) {minutesString = '0' + minutesString; }
    if (seconds < 10) {secondsString = '0' + secondsString; }
    let total = hoursString + ':' + minutesString + ':' + secondsString;
    return total;
  }

  deleteTimer() {
    this.timerService.deleteTimer(this.timerFetch.id)
    .then(res => {
      this.emitDelete.emit(res);
      let content = 'Deleted';
      this.msgs = [];
      this.msgs.push({severity: 'success', summary: 'Success', detail: content});
    })
    .catch(err => {
      let content = JSON.parse(err['_body']).error;
      this.msgs = [];
      this.msgs.push({severity: 'error', summary: 'Error', detail: content});
    });
  }

  startTimer() {
    this.emitStart.emit(this.timerFetch);
  }
// -------------------- edit timer's description ------------------------------------
  submitDes() {
    this.timer.task_name = this.editDes;
    this.timer.category_member_id = this.timerFetch.category_member_id;
    this.submitEdit();
    this.hideDiv(0);
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
    this.varTimeOut = setTimeout(() => this.filterRecentTasks(this.editDes), 500);
  }

  getTaskInfo(arg: Task) {
    console.log(arg);
    this.timer.task_id = arg.id;
    this.timer.category_member_id = arg.category_member_id;
    this.submitEdit();
    this.hideDiv(0);
  }

// -------------------- edit timer's category --------------------------------------
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
    this.varTimeOut = setTimeout(() => this.filterProjectJoin(this.searchPattern), 500);
  }

  showDiv(i) {
    let str = '';
    if (i === 0) {
      str = 'dropdown div-des';
    } else if (i === 1) {
      str = 'dropdown div-task';
    } else if (i === 2) {
      str = 'dropdown div-time';
    }
    this.divClass[i] = str;
    this.filterRecentTasks('');
  }

  hideDiv(i) {
    this.divClass[i] = 'hiddenDiv';
  }

  setCategory(arg) {
    console.log(arg);
    this.timer.task_name = this.timerFetch.task.name;
    this.timer.category_member_id = arg.category_member_id;
    this.submitEdit();
    this.hideDiv(1);
  }

  /*submitCat() {
    this.timer.category_member_id = null;
    this.timer.task_id = null;
    this.timer.task_name = this.timerFetch.task_name;
    this.submitEdit();
  }*/
// --------------------------edit timer's time -----------------------------
  timeToString(dateTimePara) {
    let dateTime = new Date(dateTimePara);
    let hours = dateTime.getHours();
    let hoursString = (hours < 10) ? '0' + hours.toString() : hours.toString();
    let minutes = dateTime.getMinutes();
    let minutesString = (minutes < 10) ? '0' + minutes.toString() : minutes.toString();
    return hoursString + ':' + minutesString;
  }

  showMini(i) {
    let str = '';
    if (i === 0) {
      str = 'option start';
    } else if (i === 1) {
      str = 'option end';
    }
    this.miniDiv[i] = str;
  }

  hideMini(i) {
    this.miniDiv[i] = 'option hide';
  }

  stringToTime(str, date: Date) {
    let timeValue = str.split(':');
    let hours = parseInt(timeValue[0], 10);
    let minutes = parseInt(timeValue[1], 10);
    date.setHours(hours);
    date.setMinutes(minutes);
  }

  editTimerTime(i) {
    let str = '';
    let date;
    if (i === 0) {
      if (this.startString === '') {
        this.startString = this.timeToString(this.timerFetch.start_time);
      }
      str = this.startString;
      date = this.startDateEdit;
    }
    if (i === 1) {
      if (this.endString === '') {
        this.endString = this.timeToString(this.timerFetch.start_time);
      }
      str = this.endString;
      date = this.endDateEdit;
    }
    console.log(str);
    this.stringToTime(str, date);
    this.totalString = this.secondToTime(this.totalTimeEdit());
  }

  totalTimeEdit() {
    let from = this.startDateEdit.getTime();
    let to = this.endDateEdit.getTime();
    let res = Math.round((to - from) / 1000);
    if (res >= 0) {
      if (res >= 24 * 60 * 60) {
        let date = this.endDateEdit.getDate();
        date -= 1;
        this.endDateEdit.setDate(date);
        return this.totalTimeEdit();
      }
      return res;
    } else {
      let date = this.endDateEdit.getDate();
      date += 1;
      this.endDateEdit.setDate(date);
      return this.totalTimeEdit();
    }
  }

  selectEditDate(event) {
    console.log(event);
    let date = new Date(event);
    let dat = date.getDate();
    let month = date.getMonth();
    let year = date.getFullYear();
    this.startDateEdit.setDate(dat);
    this.endDateEdit.setDate(dat);
    this.startDateEdit.setMonth(month);
    this.endDateEdit.setMonth(month);
    this.startDateEdit.setFullYear(year);
    this.endDateEdit.setFullYear(year);
    let len = this.strOption.length;
    for (let i = 0; i < len; i++) {
      this.startEarlier[i].setDate(dat);
      this.startEarlier[i].setMonth(month);
      this.startEarlier[i].setFullYear(year);

      this.startLater[i].setDate(dat);
      this.startLater[i].setMonth(month);
      this.startLater[i].setFullYear(year);

      this.endEarlier[i].setDate(dat);
      this.endEarlier[i].setMonth(month);
      this.endEarlier[i].setFullYear(year);

      this.endLater[i].setDate(dat);
      this.endLater[i].setMonth(month);
      this.endLater[i].setFullYear(year);
    }
    this.endLastTimer.setDate(dat);
    this.endLastTimer.setMonth(month);
    this.endLastTimer.setFullYear(year);
  }

  generateOptions() {
    let i = 0;
    for (let num of this.strOption) {
      let diff = num * 60 * 1000;
      this.startEarlier[i] = new Date (this.startDateEdit.getTime() - diff);
      this.startLater[i] = new Date (this.startDateEdit.getTime() + diff);
      this.endEarlier[i] = new Date (this.endDateEdit.getTime() - diff);
      this.endLater[i] = new Date (this.endDateEdit.getTime() + diff);
      i++;
    }
  }

  selectOption(table, column, index) {
    if (index > 3) {
      this.startDateEdit = new Date(this.endLastTimer);
    } else {
      let target;
      if (table === 0) {
        if (column === 0) {
          target = this.startEarlier;
        }else {
          target = this.startLater;
        }
        this.startDateEdit = new Date(target[index]);
        this.startString = this.timeToString(this.startDateEdit);
      } else {
        if (column === 0) {
          target = this.endEarlier;
        }else {
          target = this.endLater;
        }
        this.endDateEdit = new Date(target[index]);
        this.endString = this.timeToString(this.endDateEdit);
      }
    }
    this.totalString = this.secondToTime(this.totalTimeEdit());
    this.generateOptions();
  }

  submitTime() {
    this.timer.task_id = this.timerFetch.task.id;
    this.timer.category_member_id = this.timerFetch.category_member_id;
    this.isTimeEdited = true;
    this.submitEdit();
    this.hideDiv(2);
  }

  cancelTime() {
    this.startDateEdit = new Date(this.timerFetch.start_time);
    this.endDateEdit = new Date(this.timerFetch.stop_time);
    this.totalString = this.secondToTime(this.totalTimeEdit());
    this.generateOptions();
  }

// ------------------------- Submit Edit ---------------------------
  submitEdit() {
    let id = this.timerFetch.id;
    if (this.timer.task_name !== undefined) {
      if (this.timer.task_name === this.timerFetch.task.name &&
      this.timer.category_member_id === this.timerFetch.category_member_id) {
        delete this.timer['task_name'];
      } else if (this.timer.task_name !== this.timerFetch.task.name ||
      this.timer.category_member_id !== this.timerFetch.category_member_id ) {
        delete this.timer['task_id'];
      }
    }
    this.timer.start_time = this.startDateEdit.toString();
    this.timer.stop_time = this.endDateEdit.toString();
    this.timerPut.timer_update = this.timer;
    console.log(this.timer);
    this.timerService.editTimer(id, this.timerPut)
    .then(res => {
      this.isTimeEdited = true;
      this.timeEditedEmit.emit(this.isTimeEdited);
      this.isTimeEdited = false;
      console.log(res);
      this._timerFetch = res;
      let content = 'Saved';
      this.msgs = [];
      this.msgs.push({severity: 'success', summary: 'Success', detail: content});
    })
    .catch(err => {
      console.log(err);
      let content = JSON.parse(err['_body']).error;
      this.msgs = [];
      this.msgs.push({severity: 'error', summary: 'Error', detail: content});
    });
    this.editDes = '';
  }

  getClickEvent(className) {
    console.log(className);
    if (this.divClass[0] === 'dropdown div-des') {
      if (className === 'fa fa-check imgspan submit' || className === 'recta' || className === 'content'
      || className === 'search-text ng-untouched ng-pristine ng-valid') {

      } else {
        this.divClass[0] = 'hiddenDiv';
      }
    }
    if (this.divClass[1] === 'dropdown div-task') {
      if (className === 'search-text ng-untouched ng-pristine ng-valid' || className === 'search-box'
      || className === 'dot' || className === 'dot-container' || className === 'client' || className === 'project'
      || className === 'title-container') {

      } else {
        this.divClass[1] = 'hiddenDiv';
      }
    }
    if (this.divClass[2] === 'dropdown div-time') {
      if (className === 'dropdown div-time' || className === 'time-label' || className === 'fa fa-angle-left'
      || className === 'fa fa-angle-right' || className === 'ui-datepicker-next ui-corner-all ui-state-hover ui-datepicker-next-hover'
      || className === 'ui-datepicker-prev ui-corner-all ui-state-hover ui-datepicker-prev-hover'
      || className === 'ui-state-default ui-state-active ui-state-hover' || className === 'ui-datepicker-title'
      || className === 'ui-state-default ui-state-hover ui-state-highlight' || className === 'ui-state-default ui-state-hover'
      || className === 'ui-datepicker-year' || className === 'ui-datepicker-month'
      || className === 'time-picker ng-untouched ng-pristine ng-valid' || className === 'time-picker ng-untouched ng-valid ng-dirty'
      || className === 'time-picker ng-valid ng-dirty ng-touched' || className === 'option start' || className === 'option end'
      || className === 'earlier' || className === 'later' || className === 'op-name' || className === 'fa fa-check imgspan submit') {

      } else {
        this.divClass[2] = 'hiddenDiv';
      }
    }
  }
}
