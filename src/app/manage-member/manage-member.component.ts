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
  employeePosts: Member[] = [];
  members: Member[] = [];
  items: any;
  navClass = ['choosing', '', '', '', ''];
  roles = ['Admin', 'PM', 'Member'];
  displayAddJob: boolean = false;
  newJobName: string = '';
  currentJobs = [];
  constructor(private membershipService: MembershipService, private jobService: JobService) { }
  ngOnInit() {
    this.membershipService.getAllMembership()
    .then(res => {
        this.employeePosts = res;
        for (let em of this.employeePosts) {
          let mem = Object.create(em);
          this.members.push(mem);
        }
        console.log(res);
      })
    .catch(err => console.log(err));
    this.jobService.getAllJobs()
    .then(res => {
      console.log(res);
      this.currentJobs = res;
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
    let job = {name: this.newJobName};
    let jobPost = {job: job};
    this.jobService.addNewJob(jobPost)
    .then(res => {
      console.log(res);
      this.newJobName = '';
      this.displayAddJob = false;
      let content = 'New Job Added';
      this.msgs = [];
      this.msgs.push({severity: 'success', summary: 'Success', detail: content});
      this.currentJobs.push(res);
    })
    .catch(err => {
      let content = JSON.parse(err['_body']).error;
      this.msgs = [];
      this.msgs.push({severity: 'error', summary: 'Error', detail: content});
    })
  }

  changeNavClass(a) {
    let len = this.navClass.length;
    for (let i = 0; i < len; i++) {
      this.navClass[i] = '';
    }
    this.navClass[a] = 'choosing';
  }
}
