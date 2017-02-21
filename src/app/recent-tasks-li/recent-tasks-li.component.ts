import { TimerFetch } from './../models/timer-fetch';
import { Component, OnInit, Input, EventEmitter, Output } from '@angular/core';

@Component({
  selector: 'app-recent-tasks-li',
  templateUrl: './recent-tasks-li.component.html',
  styleUrls: ['./recent-tasks-li.component.scss']
})
export class RecentTasksLiComponent implements OnInit {
  @Input()
  task: TimerFetch;
  @Output()
  emitStart = new EventEmitter<TimerFetch>();
  hover: boolean = false;
  spanClass = 'hide';
  constructor() { }

  ngOnInit() {
  }

  showSpan() {
    this.spanClass = 'show';
  }

  hideSpan() {
    this.spanClass = 'hide';
  }

  startTimer() {
    this.emitStart.emit(this.task);
  }

}
