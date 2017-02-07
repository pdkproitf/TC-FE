import { Router } from '@angular/router';
import { Project, ProjectPost } from './../models/project';
import { Component, OnInit } from '@angular/core';
import { Location } from '@angular/common';

@Component({
  selector: 'app-create-project',
  templateUrl: './create-project.component.html',
  styleUrls: ['./create-project.component.scss']
})
export class CreateProjectComponent implements OnInit {
  reportType: number = 1;
  classBtn: string[] = ['active', ''];
  project: Project = new Project();
  projectPost: ProjectPost = new ProjectPost();
  constructor(private router: Router, private location: Location) { }

  ngOnInit() {
    this.project.report_permission = 1;
    this.project.background = '#FFBB47';
  }

  setTypeReport(num: number) {
    this.reportType = num;
    this.project.report_permission = num;
    num -= 1;
    if (this.classBtn[num] !== 'active') {
      this.classBtn[num] = 'active';
    }
    for (let i = 0; i < 2; i++ ) {
      if (i !== num ) {
        this.classBtn[i] = '';
      }
    }
  }

  log() {
    console.log(this.project);
  }

  cancel() {
    this.location.back();
  }

  onSubmit() {
    this.projectPost.project = this.project;
    alert(this.projectPost);
    console.log(this.projectPost);
  }

}
