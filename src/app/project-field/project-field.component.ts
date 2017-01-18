import { Component, OnInit } from '@angular/core';
import { Project } from '../models/project';
@Component({
  selector: 'app-project-field',
  templateUrl: './project-field.component.html',
  styleUrls: ['./project-field.component.scss']
})
export class ProjectFieldComponent implements OnInit {
  myProject: Project = {
    name: 'Temp Project',
    tasks: ['Task1', 'Task2', 'Task3'],
    company: 'My Company',
    color: '#EA4335',
  };
  classBtns = ['playBtn', 'playBtn', 'playBtn'];
  constructor() { }

  ngOnInit() {
  }
  changeClass(i): void{
    this.classBtns[i] = this.classBtns[i] === 'playBtn' ? 'stopBtn' : 'playBtn';
  }
}
