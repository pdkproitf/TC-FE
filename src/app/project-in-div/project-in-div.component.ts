import { ProjectJoin } from './../models/project-join';
import { Component, OnInit, Input } from '@angular/core';

@Component({
  selector: 'app-project-in-div',
  templateUrl: './project-in-div.component.html',
  styleUrls: ['./project-in-div.component.scss']
})
export class ProjectInDivComponent implements OnInit {
  @Input()
  myProject: ProjectJoin;
  constructor() { }

  ngOnInit() {
  }

}
