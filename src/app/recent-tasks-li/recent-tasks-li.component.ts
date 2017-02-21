import { TimerFetch } from './../models/timer-fetch';
import { Component, OnInit, Input } from '@angular/core';

@Component({
  selector: 'app-recent-tasks-li',
  templateUrl: './recent-tasks-li.component.html',
  styleUrls: ['./recent-tasks-li.component.scss']
})
export class RecentTasksLiComponent implements OnInit {
  @Input()
  task: TimerFetch;
  constructor() { }

  ngOnInit() {
  }

}
