import { Project } from './../models/project';
import { Component, OnInit } from '@angular/core';

@Component({
  selector: 'app-project-field-list',
  templateUrl: './project-field-list.component.html',
  styleUrls: ['./project-field-list.component.scss']
})
export class ProjectFieldListComponent implements OnInit {
  sharedVarParent = 'hello';
  myProjectList: Project[]=[
    {
      name: 'Temp Project',
      tasks: ['Task1', 'Task2', 'Task3'],
      company: 'My Company',
      color: '#1abc9c',
    },
    {
      name: 'Temp Project 1',
      tasks: ['Task1', 'Task2', 'Task3'],
      company: 'My Company 1',
      color: '#2ecc71',
    },
    {
      name: 'Temp Project 2',
      tasks: ['Task1', 'Task2', 'Task3'],
      company: 'My Company 2',
      color: '#3498db',
    },
    {
      name: 'Temp Project 3',
      tasks: ['Task1', 'Task2', 'Task3'],
      company: 'My Company 3',
      color: '#f1c40f',
    },
    {
      name: 'Temp Project 4',
      tasks: ['Task1', 'Task2', 'Task3'],
      company: 'My Company 4',
      color: '#d35400',
    },
    {
      name: 'Temp Project 5',
      tasks: ['Task1', 'Task2', 'Task3'],
      company: 'My Company 5',
      color: '#e74c3c',
    }
  ]
  
  constructor() { }
  
  ngOnInit() {
  }

}