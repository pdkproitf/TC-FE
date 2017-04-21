import { Message } from 'primeng/primeng';
import { MembershipService } from '../../services/membership-service';
import { ClientService } from '../../services/client-service';
import { Location } from '@angular/common';
import { Category, CategoryGetOne } from '../../models/category';
import { Member } from '../../models/member';
import { Client, ClientPost } from '../../models/client';
import { ProjectGetOne, Project, ProjectPost, MemberRole, NewCategory, MemberCat, MemberCatList } from '../../models/project';
import { ProjectService } from '../../services/project-service';
import { ActivatedRoute, Router } from '@angular/router';
import { Component, OnInit } from '@angular/core';

@Component({
  selector: 'app-edit-project',
  templateUrl: './edit-project.component.html',
  styleUrls: ['./edit-project.component.scss']
})
export class EditProjectComponent implements OnInit {
  msgs: Message[] = [];
  currentProject: ProjectGetOne;

  isLoaded: boolean = false;
  reportType: number;
  classBtn: string[] = ['active', ''];
  project: Project = new Project();
  projectPost: ProjectPost = new ProjectPost();
  currentClients: Object[] = [];
  client: Client = new Client();
  clientPost: ClientPost = new ClientPost();
  display: boolean = false;

  classDiv: string = 'hidden';
  searchName: string = 'Add more people';
  members: Member[] = [];
  membersSearch: Member[] = [];
  searchVar;
  membersToAdd: Member[] = [];
  membersRoleToAdd: boolean[] = [];

  category = new Category();
  newCategories: NewCategory[] = [];
  newBillable: boolean[] = [];
  newMemberLists: MemberCatList[] = [];
  displayTaskAdd: boolean = false;
  member_ids_array = [];

  isLoading = false;
  isLoading0 = false;

  constructor( private projectService: ProjectService, private route: ActivatedRoute,
  private router: Router, private location: Location, private clientService: ClientService,
  private membershipService: MembershipService) { }

  ngOnInit() {
    let para = this.route.params['_value'].id;
    console.log(para);
    this.isLoading = true;
    this.clientService.getAllClient()
    .then(res => {
      let len = res.length;
      if (len > 0) {
        this.project.client_id = res[0].id;
        for ( let i = 0; i < len; i++) {
          this.currentClients.push(res[i]);
        }
      }
      this.isLoading = false;
    })
    .catch(error => {
      console.log(error);
      this.isLoading = false;
      }
    );
    this.isLoading0 = true;
    this.membershipService.getAllMembership()
    .then(res => {
      this.members = res;
      this.membersSearch = this.members;
      this.isLoading0 = false;
    })
    .catch(err => {
      console.log(err);
      this.isLoading0 = false;
    });

    let varIn = setInterval(() => {
      if (!this.isLoading && !this.isLoading0) {
        this.getCurrentProject(para);
        clearInterval(varIn);
      } else {}
    }
    , 200);

  }

  getCurrentProject(para) {
    this.isLoading = true;
    this.projectService.getProject(para)
    .then(res => {
      this.currentProject = res;
      this.project.name = this.currentProject.name;
      this.project.background = this.currentProject.background;
      this.project.client_id = this.currentProject.client.id;
      this.setTypeReport(this.currentProject.is_member_report);
      this.fetchExistingMembers();
      this.fetchExistingCategories();
      this.fetchMemberIds();
      this.isLoading = false;
    })
    .catch(err => {
      console.log(err);
      this.isLoading = false;
    });
  }

  fetchExistingMembers() {
    let i = 0;
    for (let mem of this.currentProject.members){
      for (let mem0 of this.members){
        if (mem0.id === mem.id) {
          this.addEmployee(mem0);
          this.membersRoleToAdd[i] = mem.is_pm;
          i++;
        }
      }
    }
  }

  fetchExistingCategories() {
    for (let cat of this.currentProject.categories){
      let category = new NewCategory();
      category.category_name = cat.name;
      category.name = cat.name;
      category.id = cat.id;
      category.is_billable = cat.is_billable;
      this.newCategories.push(category);
      this.newBillable.push(cat.is_billable);
      this.member_ids_array.push([]);
      this.newMemberLists.push(new MemberCatList());
    }
  }

  fetchMemberIds() {
    let len = this.currentProject.categories.length;
    for (let i = 0; i < len; i++) {
      let category = this.currentProject.categories[i];
      let len0 = category.members.length;
      for (let j = 0; j < len0; j++) {
        let id = category.members[j].id;
        if (this.member_ids_array[i].indexOf(id) < 0) {
          this.member_ids_array[i].push(id);
        }
        if (i === 0) {
          console.log(category);
          console.log(this.member_ids_array[i]);
        }
        /*this.newMemberLists[i].memberCats = [];
        let mC = new MemberCat();
        mC.member_id = category.members[j].id;
        this.newMemberLists[i].memberCats.push(mC);*/
      }
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
    this.isLoading = true;
    this.projectService.editProject(this.currentProject.id, this.projectPost)
    .then(res => {
      this.isLoading = false;
      console.log(res);
      this.router.navigate(['projects']);
    })
    .catch(error => {
      this.isLoading = false;
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
    this.isLoading = true;
    this.clientService.addClient(this.clientPost)
    .then(res => {
      this.isLoading = false;
      console.log(res);
      this.display = false;
      this.currentClients.push(res);
      this.project.client_id = res.id;
    })
    .catch(error => {
      this.isLoading = false;
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

      let len = this.member_ids_array.length;
      let id = arg.id;
      for (let h = 0; h < len; h++) {
        let index = this.member_ids_array[h].indexOf(id);
        while (index > -1) {
          this.member_ids_array[h].splice(index, 1);
          index = this.member_ids_array[h].indexOf(id);
          console.log(this.member_ids_array[h]);
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
    this.project.members = [];
    for (let i = 0; i < len; i++) {
      let memberRole = new MemberRole();
      memberRole.member_id = this.membersToAdd[i].id;
      memberRole.is_pm = this.membersRoleToAdd[i];
      memberRole.id = this.membersToAdd[i].id;
      this.project.members.push(memberRole);
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
    cat.name = this.category.name;
    cat.is_billable = false;
    cat.members = [];

    let cate = new CategoryGetOne();
    cate.is_billable = false;
    cate.name = this.category.name;
    cate.members = [];
    this.currentProject.categories.push(cate);

    this.newCategories.push(cat);
    this.newBillable.push(false);
    this.newMemberLists.push(new MemberCatList());
    this.member_ids_array.push([]);
    this.displayTaskAdd = false;
  }

  updateNewCategories() {
    this.filterMemberInProject();
    let len = this.newCategories.length;
    for (let i = 0; i < len; i++) {
      this.newCategories[i].is_billable = this.newBillable[i];
      // this.newCategories[i].members = this.newMemberLists[i].memberCats;
      this.newCategories[i].member_ids = this.member_ids_array[i];

    }
  }

  updateCategoriesToProject() {
    this.updateNewCategories();
    this.project.category_members = this.newCategories;
    this.project.categories = this.newCategories;
  }

  removeNewTask(i) {
    this.newCategories.splice(i, 1);
    this.newBillable.splice(i, 1);
    this.newMemberLists.splice(i, 1);
  }

  newChkFunc(arg, i) {
    this.newBillable[i] = arg;
  }

  newAddMember(mem: MemberCat, i: number) {
    // this.newMemberLists[i].memberCats.push(mem);
    let id = mem.member_id;
    if (this.member_ids_array[i].indexOf(id) < 0) {
      this.member_ids_array[i].push(mem.member_id);
    }
  }

  newDeleteMember(arg, i) {
    console.log(arg);
    let len = this.member_ids_array[i].length;
    console.log(len);
    for (let j = 0; j < len; j++) {
      if (this.member_ids_array[i][j] === arg.id) {
        console.log(this.member_ids_array[i][j] + '===' + arg.id);
        this.member_ids_array[i].splice(j, 1);
        this.currentProject.categories[i].members.splice(j, 1);
        len--;
      }
    }
    // this.newMemberLists[i].memberCats.splice(key, 1);
    // this.member_ids_array[i].splice(key, 1);
  }

  printEvent(arg) {
    console.log(arg);
  }

  filterMemberInProject() {
    let len = this.member_ids_array.length;
    for (let i = 0; i < len; i++) {
      let len0 = this.member_ids_array[i].length;
      for (let j = 0; j < len0; j++) {
        if (this.isInMemberProject(this.member_ids_array[i][j]) < 0 ) {
          this.member_ids_array[i].splice(j, 1);
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
