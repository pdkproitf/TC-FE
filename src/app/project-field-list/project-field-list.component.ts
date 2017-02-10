import { Project } from './../models/project';
import { Component, OnInit } from '@angular/core';

@Component({
  selector: 'app-project-field-list',
  templateUrl: './project-field-list.component.html',
  styleUrls: ['./project-field-list.component.scss']
})
export class ProjectFieldListComponent implements OnInit {
  sharedVarParent = 'hello';
  myProjectList: Project[] = [];
  constructor() { }

  ngOnInit() {
  }

}