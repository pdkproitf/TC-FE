import { ProjectJoin } from './../models/project-join';
import { Component, OnInit, Input, Output, EventEmitter } from '@angular/core';
@Component({
  selector: 'app-project-field',
  templateUrl: './project-field.component.html',
  styleUrls: ['./project-field.component.scss']
})
export class ProjectFieldComponent implements OnInit {
  @Input()
  myProject: ProjectJoin;
  classBtns = [];
  hidden = false;
  constructor() { }

  ngOnInit() {
    let len = this.myProject.category.length;
    for (let i = 0; i < len; i++) {
      this.classBtns.push('play-btn');
    }
  }

  changeClass(i): void {
    let len = this.classBtns.length;
    for (let j = 0; j < len; j++) {
      if (j !== i) {
        this.classBtns[j] = 'play-btn';
      }
    }
    this.classBtns[i] = this.classBtns[i] === 'play-btn' ? 'stop-btn' : 'play-btn';
  }

  hideProj() {
    this.hidden = true;
  }

  showProj() {
    this.hidden = false;
  }
}
