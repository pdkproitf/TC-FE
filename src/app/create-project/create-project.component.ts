import { Client, ClientPost } from './../models/client';
import { ClientService } from './../services/client-service';
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
  client: Client = new Client();
  clientPost: ClientPost = new ClientPost();
  display: boolean = false;
  constructor(private router: Router, private location: Location
  , private clientService: ClientService) { }

  ngOnInit() {
    this.project.report_permission = 1;
    this.project.background = '#FFBB47';
    this.clientService.getAllClient()
    .then(res => console.log(res))
    .catch(error => console.log(error));
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

  displayDialog() {
    this.display = true;
  }

  onSubmitClient() {
    this.clientPost.client = this.client;
    this.clientService.addClient(this.clientPost)
    .then(res => {
      this.display = false;
      console.log(res);
    })
    .catch(error => {
      console.log(error);
    });
  }

}
