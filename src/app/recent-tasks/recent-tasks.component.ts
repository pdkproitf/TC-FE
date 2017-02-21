import { TimerFetch } from './../models/timer-fetch';
import { Component, OnInit, Input } from '@angular/core';

@Component({
  selector: 'app-recent-tasks',
  templateUrl: './recent-tasks.component.html',
  styleUrls: ['./recent-tasks.component.scss']
})
export class RecentTasksComponent implements OnInit {
  @Input()
  recentTasks: TimerFetch[] = [];
  constructor() { }

  ngOnInit() {
  }

}
