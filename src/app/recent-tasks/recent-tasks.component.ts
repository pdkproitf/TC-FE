import { TimerFetch } from './../models/timer-fetch';
import { Component, OnInit, Input, Output, EventEmitter } from '@angular/core';

@Component({
  selector: 'app-recent-tasks',
  templateUrl: './recent-tasks.component.html',
  styleUrls: ['./recent-tasks.component.scss']
})
export class RecentTasksComponent implements OnInit {
  @Input()
  recentTasks: TimerFetch[] = [];
  @Input()
  num = 0;
  @Output()
  emitStart = new EventEmitter<TimerFetch>();
  constructor() { }

  ngOnInit() {
  }

  startTimer(arg) {
    this.emitStart.emit(arg);
  }

}
