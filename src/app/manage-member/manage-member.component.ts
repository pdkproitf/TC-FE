import { JobService } from './../services/job-service';
import { Message } from 'primeng/primeng';
import { Member } from './../models/member';
import { EmployeePost } from './../models/employee';
import { Membership, MembershipPost } from './../models/membership';
import { MembershipService } from './../services/membership-service';
import { Component, OnInit } from '@angular/core';

@Component({
  selector: 'app-manage-member',
  templateUrl: './manage-member.component.html',
  styleUrls: ['./manage-member.component.scss']
})
export class ManageMemberComponent implements OnInit {
  msgs: Message[] = [];
  display: boolean = false;
  membership: Membership = new Membership();
  allEmployees: Member[] = [];
  employeePosts: Member[] = [];
  members: Member[] = [];
  items: any;
  navClass = ['choosing', '', '', '', ''];
  roles = ['Admin', 'PM', 'Member'];
  displayAddJob: boolean = false;
  newJobName: string = '';
  currentJobs = [];
  searchJobs = [];
  divDisplays = [];
  submitJobs = [];
  searchJobText = '';
  searchNameText = '';
  varTimeOut: any;
  varTimeOut0: any;
  constructor(private membershipService: MembershipService, private jobService: JobService) { }
  ngOnInit() {
    this.membershipService.getAllMembership()
    .then(res => {
        this.allEmployees = res;
        this.filterEmployees('');
        console.log(res);
      })
    .catch(err => console.log(err));
    this.jobService.getAllJobs()
    .then(res => {
      console.log(res);
      this.currentJobs = res;
      this.filterJobs('');
    })
    .catch(err => {
      let content = JSON.parse(err['_body']).error;
      this.msgs = [];
      this.msgs.push({severity: 'error', summary: 'Error', detail: content});
    });
    this.items = [
      {label: 'PDF', icon: 'fa-file-pdf-o'},
      {label: 'DOC', icon: 'fa-file-text-o'},
      {label: 'XSL', icon: 'fa-file-excel-o', command: (event) => {
        console.log(event);
        }
      }
    ];
  }

  displayDialog() {
    this.display = true;
  }

  undisplayDialog() {
    this.display = false;
  }

  onSubmitMember() {
    this.membershipService.addNewMembership(this.membership)
    .then(res => {
      this.undisplayDialog();
      console.log(res);
      let content = 'Added new member';
      this.msgs = [];
      this.msgs.push({severity: 'success', summary: 'Success', detail: content});
    })
    .catch(err => {
      let content = JSON.parse(err['_body']).error;
      this.msgs = [];
      this.msgs.push({severity: 'error', summary: 'Error', detail: content});
    });
  }

  onSubmitJob() {
    let jobPost = {
        job: {
          name: this.newJobName
        }
      };
    console.log(jobPost);
    this.jobService.addNewJob(jobPost)
    .then(res => {
      console.log(res);
      console.log('success');
      this.newJobName = '';
      this.displayAddJob = false;
      let content = 'New Job Added';
      this.msgs = [];
      this.msgs.push({severity: 'success', summary: 'Success', detail: content});
      this.currentJobs.push(res);
      this.filterJobs(this.searchJobText);
      }
    )
    .catch(err => {
      let content = JSON.parse(err['_body']).error;
      this.msgs = [];
      this.msgs.push({severity: 'error', summary: 'Error', detail: content});
      }
    );
  }

  changeNavClass(a) {
    let len = this.navClass.length;
    for (let i = 0; i < len; i++) {
      this.navClass[i] = '';
    }
    this.navClass[a] = 'choosing';
  }

  addJobToEmployee(employee, job) {
    if (employee.jobs.indexOf(job) < 0) {
      employee.jobs.push(job);
    }
    console.log(this.employeePosts.indexOf(employee));
  }

  deleteJobFromEmployee(employee, job) {
    let i = employee.jobs.indexOf(job);
    console.log(i);
    if (i >= 0) {
      employee.jobs.splice(i, 1);
    }
    console.log(this.employeePosts.indexOf(employee));
  }

  doesHasNewJobs(id): boolean {
    if (this.employeePosts[id].jobs.length !== this.members[id].jobs.length) {
      console.log('difference range');
      return true;
    }
    let len = this.members[id].jobs.length;
    for (let i = 0; i < len; i++) {
      if (this.employeePosts[id].jobs[i].id !== this.members[id].jobs[i].id ) {
        console.log('difference elements');
        return true;
      }
    }
    return false;
  }

  cancelJobs(id) {
    let jobs = Object.create(this.employeePosts[id].jobs);
    this.members[id].jobs = jobs;
  }

  editRole(event, id) {
    if (this.members[id].role.id === 1) {
      return;
    }
    if (parseInt(event.toString(), 10) === 1) {
      return;
    }
    // console.log(event);
    this.members[id].role.id = event;
    this.submitEditedJobs(id);
  }

  filterJobs(str) {
    this.searchJobs = [];
    for (let job of this.currentJobs) {
      if(job.name.indexOf(str) > -1) {
        this.searchJobs.push(job);
      }
    }
  }

  keyUpSearch() {
    clearTimeout(this.varTimeOut);
    this.varTimeOut = setTimeout(() => this.filterJobs(this.searchJobText), 500);
  }

  filterEmployees(str) {
    this.employeePosts = [];
    this.members = [];
    for (let employee of this.allEmployees) {
      if (employee.user.first_name.indexOf(str) > -1 || employee.user.last_name.indexOf(str) > -1) {
        this.employeePosts.push(employee);
      }
    }
    for (let em of this.employeePosts) {
      let mem = Object.create(em);
      let jobs = Object.create(em.jobs);
      mem.jobs = jobs;
      this.members.push(mem);
      this.divDisplays.push(0);
      this.submitJobs.push(false);
    }
  }

  keyUpSearchName() {
    clearTimeout(this.varTimeOut0);
    this.varTimeOut0 = setTimeout(() => this.filterEmployees(this.searchNameText), 500);
  }

  submitEditedJobs(id) {
    let jobs = [];
    for (let job of this.members[id].jobs) {
      jobs.push(job.id);
    }
    let mem = {
      members: {
        role_id: this.members[id].role.id,
        jobs: jobs
      }
    };
    this.membershipService.editMember(this.members[id].id, mem)
    .then(res => {
      console.log(res);
      let content = 'Edit successfully';
      this.msgs = [];
      this.msgs.push({severity: 'success', summary: 'Success', detail: content});
      this.employeePosts[id] = res;
      // console.log(this.employeePosts);
      this.submitJobs[id] = this.doesHasNewJobs(id);
    })
    .catch(err => {
      let content = JSON.parse(err['_body']).error;
      this.msgs = [];
      this.msgs.push({severity: 'error', summary: 'Error', detail: content});
    })
  }
}
