import { Project } from './../models/project';
import { ProjectFieldComponent } from './../project-field/project-field.component';
import { Component, OnInit } from '@angular/core';

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
      color: '#0098F0',
    },
    {
      name: 'Temp Project 2',
      tasks: ['Task1', 'Task2', 'Task3'],
      company: 'My Company 2',
      color: '#58E573',
    },
    {
      name: 'Temp Project 3',
      tasks: ['Task1', 'Task2', 'Task3'],
      company: 'My Company 3',
      color: '#FFB91B',
    },
    {
      name: 'Temp Project 4',
      tasks: ['Task1', 'Task2', 'Task3'],
      company: 'My Company 4',
      color: '#A82AB5',
    },
    {
      name: 'Temp Project 5',
      tasks: ['Task1', 'Task2', 'Task3'],
      company: 'My Company 5',
      color: '#EA4335',
    }
  ]
  ngOnInit() {
  }

}