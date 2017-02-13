import { Category } from './../models/category';
import { CategoryService } from './../services/category-service';
import { EmployeePost, Employee } from './../models/employee';
import { MembershipService } from './../services/membership-service';
import { ProjectService } from './../services/project-service';
import { Client, ClientPost } from './../models/client';
import { ClientService } from './../services/client-service';
import { Router } from '@angular/router';
import { Project, ProjectPost, MemberRole, ExistingCategory, NewCategory, MemberList, Member } from './../models/project';
import { Component, OnInit } from '@angular/core';
import { Location } from '@angular/common';

@Component({
  selector: 'app-create-project',
  templateUrl: './create-project.component.html',
  styleUrls: ['./create-project.component.scss']
})
export class CreateProjectComponent implements OnInit {
  isLoaded: boolean = false;
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


  existingCategories: Category[] = [];
  existingCategoriesToAdd: ExistingCategory[] = [];
  existingBillable: boolean[] = [];
  existingMembemLists: MemberList[] = [];


  newCategories: Category[] = [];
  newCategoriesToAdd: NewCategory[] = [];
  newBillable: boolean[] = [];
  newMemberLists: MemberList[] = [];



  displayTaskAdd: boolean = false;
  category: Category = new Category();



  constructor(private router: Router, private location: Location
  , private clientService: ClientService, private projectService: ProjectService,
  private membershipService: MembershipService, private categoryService: CategoryService) { }

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

    this.categoryService.getDefaultCategories()
    .then(res => {
      this.existingCategories = res;
      let len = this.existingCategories.length;
      for (let i = 0; i < len; i++) {
        this.existingBillable.push(false);
        this.existingMembemLists.push(new MemberList());
      }
      this.updateExistingCategoriesToAdd();
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
    this.updateCategoriesToProject();
    console.log(this.project);
  }

  cancel() {
    this.location.back();
  }

  onSubmit() {
    this.updateMemberRoleToProject();
    this.updateCategoriesToProject();
    this.projectPost.project = this.project;
    this.projectService.addProject(this.projectPost)
    .then(res => {
      console.log(res);
    })
    .catch(error => {
      console.log(error);
    });
  }
// ---------------------Adding members to projects---------->
  displayDialog() {
    this.client.name = '';
    this.display = true;
  }

  undisplayDialog() {
    this.client.name = '';
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
// --------------------------------End Adding member ---------------->
// -------------------------------Adding Tasks --------------------->
  displayTaskAddDialog() {
    this.category.name = '';
    this.displayTaskAdd = true;
  }

  undisplayTaskAddDialog() {
    this.category.name = '';
    this.displayTaskAdd = false;
  }

  onSubmitTask() {
    let cat = new Category();
    cat.name = this.category.name;
    this.newCategories.push(cat);
    this.newBillable.push(false);
    this.newMemberLists.push(new MemberList());
    this.displayTaskAdd = false;
  }

  updateExistingCategoriesToAdd() {
    this.existingCategoriesToAdd = [];
    let len = this.existingCategories.length;
    for (let i = 0; i < len; i++) {
      let existingCat = new ExistingCategory();
      existingCat.billable = this.existingBillable[i];
      existingCat.members = this.existingMembemLists[i].members;
      existingCat.category_id = this.existingCategories[i].id;
      this.existingCategoriesToAdd.push(existingCat);
    }
  }

  updateNewCategoriesToAdd() {
    this.newCategoriesToAdd = [];
    let len = this.newCategories.length;
    for (let i = 0; i < len; i++) {
      let newCat = new NewCategory();
      newCat.billable = this.newBillable[i];
      newCat.category_name = this.newCategories[i].name;
      newCat.members = this.newMemberLists[i].members;
      this.newCategoriesToAdd.push(newCat);
    }
  }

  updateCategoriesToProject() {
    this.updateExistingCategoriesToAdd();
    this.updateNewCategoriesToAdd();
    this.project.category_members.existing = this.existingCategoriesToAdd;
    this.project.category_members.new_one = this.newCategoriesToAdd;
  }

  removeExistingTask(i) {
    this.existingCategories.splice(i, 1);
    this.existingCategoriesToAdd.splice(i, 1);
    this.existingBillable.splice(i, 1);
    this.existingMembemLists.splice(i, 1);
  }

  removeNewTask(i) {
    this.newCategories.splice(i, 1);
    this.newCategoriesToAdd.splice(i, 1);
    this.newBillable.splice(i, 1);
    this.newMemberLists.splice(i, 1);
  }

  existingChkFunc(arg, i) {
    this.existingBillable[i] = arg;
  }

  newChkFunc(arg, i) {
    this.newBillable[i] = arg;
  }

  existingAddMember(mem: Member, i: number) {
    this.existingMembemLists[i].members.push(mem);
  }

  newAddMember(mem: Member, i: number) {
    this.newMemberLists[i].members.push(mem);
  }

  existingDeleteMember(key, i) {
    this.existingMembemLists[i].members.splice(key, 1);
  }

  newDeleteMember(key, i) {
    this.newMemberLists[i].members.splice(key, i);
  }

  printEvent(arg) {
    console.log(arg);
  }

}
