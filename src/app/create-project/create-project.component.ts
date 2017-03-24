import { Message } from 'primeng/primeng';
import { Category } from './../models/category';
import { Member } from './../models/member';
import { EmployeePost, Employee } from './../models/employee';
import { MembershipService } from './../services/membership-service';
import { ProjectService } from './../services/project-service';
import { Client, ClientPost } from './../models/client';
import { ClientService } from './../services/client-service';
import { Router } from '@angular/router';
import { Project, ProjectPost, MemberRole, NewCategory, MemberCat, MemberCatList } from './../models/project';
import { Component, OnInit } from '@angular/core';
import { Location } from '@angular/common';

@Component({
  selector: 'app-create-project',
  templateUrl: './create-project.component.html',
  styleUrls: ['./create-project.component.scss']
})
export class CreateProjectComponent implements OnInit {
  msgs: Message[] = [];
  isLoaded: boolean = false;
  reportType: number = 1;
  classBtn: string[] = ['active', ''];
  project: Project = new Project();
  projectPost: ProjectPost = new ProjectPost();
  currentClients: Object[] = [];
  client: Client = new Client();
  clientPost: ClientPost = new ClientPost();
  display: boolean = false;
  defaultCategories: string[] = ['Design', 'Develop', 'Deploy', 'Test', 'Maintain' ];


  classDiv: string = 'hidden';
  searchName: string = 'Add more people...';
  members: Member[] = [];
  membersSearch: Member[] = [];
  searchVar;
  membersToAdd: Member[] = [];
  membersRoleToAdd: boolean[] = [];


  category = new Category();
  newCategories: NewCategory[] = [];
  // newCategoriesToAdd: NewCategory[] = [];
  newBillable: boolean[] = [];
  newMemberLists: MemberCatList[] = [];



  displayTaskAdd: boolean = false;



  constructor(private router: Router, private location: Location
  , private clientService: ClientService, private projectService: ProjectService,
  private membershipService: MembershipService) { }

  ngOnInit() {
    this.project.is_member_report = false;
    this.project.background = '#FFBB47';

    this.clientService.getAllClient()
    .then(res => {
      let len = res.length;
      if (len > 0) {
        this.project.client_id = res[0].id;
        for ( let i = 0; i < len; i++) {
          this.currentClients.push(res[i]);
        }
      }
    })
    .catch(error => {
      console.log(error);
      let content = JSON.parse(error['_body']).error;
      this.msgs = [];
      this.msgs.push({severity: 'error', summary: 'Error', detail: content});
    }
    );

    this.membershipService.getAllMembership()
    .then(res => {
      this.members = res;
      this.membersSearch = this.members;
      console.log(res);
    })
    .catch(err => {
      let content = JSON.parse(err['_body']).error;
      this.msgs = [];
      this.msgs.push({severity: 'error', summary: 'Error', detail: content});
      console.log(err);
    });

    for (let str of this.defaultCategories) {
      let newCat = new NewCategory();
      newCat.is_billable = false;
      newCat.category_name = str;
      newCat.members = [];
      this.newCategories.push(newCat);
      this.newBillable.push(false);
      this.newMemberLists.push(new MemberCatList());
    }
  }

  setTypeReport(arg) {
    console.log(arg);
    this.project.is_member_report = arg;
    if (arg === false) {
      this.classBtn[0] = 'active';
      this.classBtn[1] = '';
    } else {
      this.classBtn[0] = '';
      this.classBtn[1] = 'active';
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
      let content = 'New Project Created';
      this.msgs = [];
      this.msgs.push({severity: 'success', summary: 'Success', detail: content});
      this.router.navigate(['projects']);
    })
    .catch(error => {
      console.log(error);
      let content = JSON.parse(error['_body']).error;
      this.msgs = [];
      this.msgs.push({severity: 'error', summary: 'Error', detail: content});
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
      console.log(res);
      this.display = false;
      this.currentClients.push(res);
      this.project.client_id = res.id;
    })
    .catch(error => {
      console.log(error);
      let content = JSON.parse(error['_body']).error;
      this.msgs = [];
      this.msgs.push({severity: 'error', summary: 'Error', detail: content});
    });
  }

  displayDiv() {
    this.classDiv = 'member-to-add';
    this.searchName = '';
  }

  undisplayDiv() {
    this.classDiv = 'hidden';
    this.searchName = 'Add more people...';
    this.membersSearch = this.members;
  }

  addEmployee(arg) {
    if (this.membersToAdd.indexOf(arg) < 0) {
      this.membersToAdd.push(arg);
      this.membersRoleToAdd.push(false);
    }
  }

  removeEmployee(arg) {
    if (this.membersToAdd.indexOf(arg) > -1) {
      let i = this.membersToAdd.indexOf(arg);
      this.membersToAdd.splice(i, 1);
      this.membersRoleToAdd.splice(i, 1);

      let len = this.newMemberLists.length;
      let id = arg.id;
      for (let h = 0; h < len; h++) {
        let len0 = this.newMemberLists[h].memberCats.length;
        for (let k = 0; k < len0; k ++) {
          console.log(this.newMemberLists[h].memberCats[k].member_id);
          if (this.newMemberLists[h].memberCats[k].member_id === id) {
            this.newMemberLists[h].memberCats.splice(k, 1);
            len0 -= 1;
          }
        }
      }
    }
  }

  keyUpSearch() {
    clearTimeout(this.searchVar);
    this.searchVar = setTimeout(() => {
      this.updateEmployeePostsSearch();
    }, 500);
  }

  updateEmployeePostsSearch() {
    let key = this.searchName;
    let len = this.members.length;
    this.membersSearch = [];
    console.log(key);
    for (let i = 0; i < len; i++) {
      let obj = this.members[i];
      if ( obj.user.first_name.indexOf(key) > -1 || obj.user.last_name.indexOf(key) > -1) {
        this.membersSearch.push(obj);
      }
    }
  }

  updateMemberRoleToProject() {
    let len = this.membersToAdd.length;
    this.project.member_roles = [];
    for (let i = 0; i < len; i++) {
      let memberRole = new MemberRole();
      memberRole.member_id = this.membersToAdd[i].id;
      memberRole.is_pm = this.membersRoleToAdd[i];
      this.project.member_roles.push(memberRole);
    }
  }

  chbFunc(arg, i) {
    console.log(arg);
    this.membersRoleToAdd[i] = arg;
  }

  addAll(arg) {
    arg.preventDefault();
    for ( let a of this.members) {
      this.addEmployee(a);
    }
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
    let cat = new NewCategory();
    cat.category_name = this.category.name;
    cat.is_billable = false;
    cat.members = [];
    this.newCategories.push(cat);
    this.newBillable.push(false);
    this.newMemberLists.push(new MemberCatList());
    this.displayTaskAdd = false;
  }


  /*updateNewCategoriesToAdd() {
    this.newCategoriesToAdd = [];
    let len = this.newCategories.length;
    for (let i = 0; i < len; i++) {
      let newCat = new NewCategory();
      newCat.billable = this.newBillable[i];
      newCat.category_name = this.newCategories[i].category_name;
      newCat.members = this.newMemberLists[i].memberCats;
      this.newCategoriesToAdd.push(newCat);
    }
  }*/

  updateNewCategories() {
    this.filterMemberInProject();
    let len = this.newCategories.length;
    for (let i = 0; i < len; i++) {
      this.newCategories[i].is_billable = this.newBillable[i];
      this.newCategories[i].members = this.newMemberLists[i].memberCats;
    }
  }

  updateCategoriesToProject() {
    // this.updateNewCategoriesToAdd();
    // this.project.category_members = this.newCategoriesToAdd;
    this.updateNewCategories();
    this.project.category_members = this.newCategories;
  }

  removeNewTask(i) {
    this.newCategories.splice(i, 1);
    // this.newCategoriesToAdd.splice(i, 1);
    this.newBillable.splice(i, 1);
    this.newMemberLists.splice(i, 1);
  }

  newChkFunc(arg, i) {
    this.newBillable[i] = arg;
  }

  newAddMember(mem: MemberCat, i: number) {
    this.newMemberLists[i].memberCats.push(mem);
    console.log(mem);
  }

  newDeleteMember(arg, i) {
    console.log(arg);
    let len = this.newMemberLists[i].memberCats.length;
    for (let j = 0; j < len; j++) {
      if (this.newMemberLists[i].memberCats[j].member_id === arg.id) {
        this.newMemberLists[i].memberCats.splice(j, 1);
        len--;
      }
    }
    // this.newMemberLists[i].memberCats.splice(key, 1);
  }

  printEvent(arg) {
    console.log(arg);
  }

  filterMemberInProject() {
    let len = this.newMemberLists.length;
    for (let i = 0; i < len; i++) {
      let len0 = this.newMemberLists[i].memberCats.length;
      for (let j = 0; j < len0; j++) {
        if (this.isInMemberProject(this.newMemberLists[i].memberCats[j].member_id) < 0 ) {
          this.newMemberLists[i].memberCats.splice(j, 1);
        }
      }
    }
  }

  isInMemberProject(arg) {
    let len = this.membersToAdd.length;
    let res = -1;
    for (let i = 0; i < len; i++) {
      if (arg === this.membersToAdd[i].id) {
        res = i;
      }
    }
    return res;
  }
}
