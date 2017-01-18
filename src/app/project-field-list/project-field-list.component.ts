import { Project } from './../models/project';
import { ProjectFieldComponent } from './../project-field/project-field.component';
import { Component, OnInit } from '@angular/core';
import {CarouselModule} from 'primeng/primeng';

@Component({
  selector: 'app-project-field-list',
  templateUrl: './project-field-list.component.html',
  styleUrls: ['./project-field-list.component.scss']
})
export class ProjectFieldListComponent implements OnInit {
  sharedVarParent = 'hello';
  constructor() { }
  myProjectList: Project[]=[
    {
      name: 'Temp Project',
      tasks: ['Task1', 'Task2', 'Task3'],
      company: 'My Company',
      color: '#EA4335',
    },
    {
      name: 'Temp Project 1',
      tasks: ['Task1', 'Task2', 'Task3'],
      company: 'My Company 1',
      color: '#EA4335',
    },
    {
      name: 'Temp Project',
      tasks: ['Task1', 'Task2', 'Task3'],
      company: 'My Company',
      color: '#EA4335',
    },
    {
      name: 'Temp Project 1',
      tasks: ['Task1', 'Task2', 'Task3'],
      company: 'My Company 1',
      color: '#EA4335',
    },
    {
      name: 'Temp Project',
      tasks: ['Task1', 'Task2', 'Task3'],
      company: 'My Company',
      color: '#EA4335',
    },
    {
      name: 'Temp Project 1',
      tasks: ['Task1', 'Task2', 'Task3'],
      company: 'My Company 1',
      color: '#EA4335',
    }
  ]
  ngOnInit() {
  }

}