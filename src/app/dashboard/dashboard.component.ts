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
  constructor() { }

  ngOnInit() {
  }
  selectCategory(arg) {
    this.currentCategory = arg;
  }
  getProjectJoins(arg) {
    this.projectJoins = arg;
    console.log(this.projectJoins);
  }
}
