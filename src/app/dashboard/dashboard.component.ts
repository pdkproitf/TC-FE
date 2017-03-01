import { TimerFetchService } from './../services/timer-fetch-service';
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
  constructor(private timerFetchService: TimerFetchService) { }

  ngOnInit() {
    this.getRecentTask(10);
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
    console.log(arg);
  }

  getRecentTask(num) {
    this.timerFetchService.getRecentTasks(num)
    .then(res => {
      this.recentTasks = res;
      console.log(this.recentTasks);
    })
    .catch( err => {
      console.log(err);
    });
  }
}
