import { CompanyService } from '../../services/company-service';
import { Task } from '../../models/task';
import { TaskService } from '../../services/task-service';
import { Timer } from '../../models/timer';
import { ProjectJoin } from '../../models/project-join';
import { CategoryInProject } from '../../models/category-in-project';
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
  recentTasks: Task[] = [];
  startWeekDay: number = 0;
  constructor(private taskService: TaskService, private companyService: CompanyService) { }

  ngOnInit() {
    this.getRecentTask(10);
    this.companyService.getCompany()
    .then(res => {
      this.startWeekDay = res.begin_week;
    })
    .catch(err => {
      console.log(err);
    });
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

  print(arg: Task) {
    console.log(arg);
  }

  getRecentTask(num) {
    this.taskService.getRecentTasks(num)
    .then(res => {
      this.recentTasks = res;
    })
    .catch( err => {
      console.log(err);
    });
  }
}
