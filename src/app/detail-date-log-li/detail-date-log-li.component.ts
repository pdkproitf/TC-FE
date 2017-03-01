import { ProjectJoin } from './../models/project-join';
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
  recentTasks: TimerFetch[] = [];

  startString: string;
  endString: string;
  totalString: string;
  startDateEdit: Date;
  endDateEdit: Date;
  miniDiv = ['minihidden', 'minihidden'];
  editTimeOption = ['5 min', '10 min', '15 min', '30 min'];
  constructor(private timerService: TimerService) { }

  ngOnInit() {
    this.projectJoinsSearch = this.projectJoins;
    this.startString = this.timeToString(this.timerFetch.start_time);
    this.endString = this.timeToString(this.timerFetch.stop_time);
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
    return (to - from) / 1000;
  }

  secondToTime(totalTime) {
    let sec_num = totalTime;
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
    })
    .catch(err => {
      console.log(err);
    });
  }

  startTimer() {
    this.emitStart.emit(this.timerFetch);
  }
// -------------------- edit timer's description ------------------------------------
  submitDes() {
    this.timerFetch.task_name = this.editDes;
    this.hideDiv(0);
    this.editDes = '';
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
  }

  hideDiv(i) {
    this.divClass[i] = 'hiddenDiv';
  }
// --------------------------edit timer's time -----------------------------
  timeToString(dateTimePara) {
    let dateTime = new Date(dateTimePara);
    let hours = dateTime.getHours();
    let hoursString = (hours < 10) ? '0' + hours.toString() : hours.toString();
    let minutes = dateTime.getMinutes();
    let minutesString = (minutes < 10) ? '0' + minutes.toString() : minutes.toString();
    return hoursString + ':' + minutesString;
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
      str = this.startString;
      date = this.startDateEdit;
    }
    if (i === 1) {
      str = this.endString;
      date = this.endDateEdit;
    }
    this.stringToTime(str, date);
    this.totalString = this.secondToTime(this.totalTimeEdit());
  }

  totalTimeEdit() {
    let from = this.startDateEdit.getTime();
    let to = this.endDateEdit.getTime();
    return (to - from) / 1000;
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
  }
}
