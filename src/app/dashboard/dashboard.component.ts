import { TimerFetch } from './../models/timer-fetch';
import { Timer } from './../models/timer';
import { ProjectJoin } from './../models/project-join';
import { CategoryInProject } from './../models/category-in-project';
import { Component, OnInit } from '@angular/core';

@Component({
  selector: 'app-dashboard',
  templateUrl: './dashboard.component.html',
  styleUrls: ['./dashboard.component.scss'],
})
export class DashboardComponent implements OnInit {
  currentCategory: CategoryInProject = new CategoryInProject();
  projectJoins: ProjectJoin[] = [];
  weekAnchor: Date[] = [];
  recentTasks: TimerFetch[] = [];
  constructor() { }

  ngOnInit() {

  }
  selectCategory(arg) {
    this.currentCategory = arg;
  }

  getProjectJoins(arg) {
    this.projectJoins = arg;
  }

  getDates(arg) {
    this.weekAnchor = arg;
  }

  print(arg: TimerFetch) {
    if (arg.task_name !== '') {
      if (this.isTimerInRecent(arg) === -1) {
        this.recentTasks.unshift(arg);
      }
      console.log(this.recentTasks);
    } else {
      return;
    }
  }

  isTimerInRecent(arg: TimerFetch) {
    let len = this.recentTasks.length;
    for (let i = 0; i < len; i++) {
      if (this.recentTasks[i].task_id === arg.task_id) {
        return i;
      }
    }
    return -1;
  }
}
