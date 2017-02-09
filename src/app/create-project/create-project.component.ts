import { EmployeePost, Employee } from './../models/employee';
import { MembershipService } from './../services/membership-service';
import { ProjectService } from './../services/project-service';
import { Client, ClientPost } from './../models/client';
import { ClientService } from './../services/client-service';
import { Router } from '@angular/router';
import { Project, ProjectPost, MemberRole } from './../models/project';
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
  employeePosts: EmployeePost[] = [];
  employeePostsSearch: EmployeePost[] = [];
  searchVar;
  employeesToAdd: Employee[] = [];
  employeesRoleToAdd: boolean[] = [];
  constructor(private router: Router, private location: Location
  , private clientService: ClientService, private projectService: ProjectService,
  private membershipService: MembershipService) { }

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
    })
    .catch(error => console.log(error));

    this.membershipService.getAllMembership()
    .then(res => {
      this.employeePosts = res;
      this.employeePostsSearch = this.employeePosts;
    })
    .catch(err => console.log(err));
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
    this.updateMemberRoleToProject();
    console.log(this.project);
  }

  cancel() {
    this.location.back();
  }

  onSubmit() {
    this.updateMemberRoleToProject();
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
    this.employeePostsSearch = this.employeePosts;
  }

  addEmployee(arg) {
    if (this.employeesToAdd.indexOf(arg) < 0) {
      this.employeesToAdd.push(arg);
      this.employeesRoleToAdd.push(false);
    }
    this.undisplayDiv();
  }

  removeEmployee(arg) {
    if (this.employeesToAdd.indexOf(arg) > -1) {
      let i = this.employeesToAdd.indexOf(arg);
      this.employeesToAdd.splice(i, 1);
      this.employeesRoleToAdd.splice(i, 1);
    }
  }

  keyUpSearch() {
    clearTimeout(this.searchVar);
    this.searchVar = setTimeout(() => {
      this.updateEmployeePostsSearch();
    }, 2000);
  }

  updateEmployeePostsSearch() {
    let key = this.searchName;
    let len = this.employeePosts.length;
    this.employeePostsSearch = [];
    console.log(key);
    for (let i = 0; i < len; i++) {
      let obj = this.employeePosts[i];
      if ( obj.employee.first_name.indexOf(key) > -1 || obj.employee.last_name.indexOf(key) > -1) {
        this.employeePostsSearch.push(obj);
      }
    }
  }

  updateMemberRoleToProject() {
    let len = this.employeesToAdd.length;
    this.project.member_roles = [];
    for (let i = 0; i < len; i++) {
      let memberRole = new MemberRole();
      memberRole.user_id = this.employeesToAdd[i].id;
      memberRole.role_id = this.employeesRoleToAdd[i] ? 1 : null;
      this.project.member_roles.push(memberRole);
    }
  }

  chbFunc(arg, i) {
    console.log(arg);
    this.employeesRoleToAdd[i] = arg;
  }
}
