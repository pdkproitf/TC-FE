import { ProjectService } from './../services/project-service';
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
  currentClients: Object[] = [];
  client: Client = new Client();
  clientPost: ClientPost = new ClientPost();
  display: boolean = false;
  classDiv: string = 'hidden';
  searchName: string = 'Add more people...';
  constructor(private router: Router, private location: Location
  , private clientService: ClientService, private projectService: ProjectService) { }

  ngOnInit() {
    this.project.report_permission = 1;
    this.project.background = '#FFBB47';
    this.clientService.getAllClient()
    .then(res => {
      let len = res.length;
      this.project.client_id = res[0].id;
      for ( let i = 0; i < len; i++) {
        this.currentClients.push(res[i]);
        }
      console.log(this.currentClients);
    })
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
    this.projectService.addProject(this.projectPost)
    .then(res => {
      console.log(res);
    })
    .catch(error => {
      console.log(error);
    });
  }

  displayDialog() {
    this.display = true;
  }

  undisplayDialog() {
    this.display = false;
  }

  onSubmitClient() {
    this.clientPost.client = this.client;
    this.clientService.addClient(this.clientPost)
    .then(res => {
      this.display = false;
      this.currentClients.push(res);
      this.project.client_id = res.id;
    })
    .catch(error => {
      console.log(error);
    });
  }

  displayDiv() {
    this.classDiv = 'member-to-add';
    this.searchName = '';
  }

  undisplayDiv() {
    this.classDiv = 'hidden';
    this.searchName = 'Add more people...';
  }

}
