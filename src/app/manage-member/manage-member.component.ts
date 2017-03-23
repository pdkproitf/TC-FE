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
  // membershipPost: MembershipPost = new MembershipPost();

  employeePosts: Member[] = [];
  // newEmployeePost: EmployeePost = new EmployeePost();
  constructor(private membershipService: MembershipService) { }

  ngOnInit() {
    this.membershipService.getAllMembership()
      .then(res => {
          this.employeePosts = res;
        })
      .catch(err => console.log(err));
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
}
