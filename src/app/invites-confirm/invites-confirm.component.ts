import { MembershipService } from './../services/membership-service';
import { MembershipConfirm } from './../models/membership';
import { Message } from 'primeng/primeng';
import { Auth, AuthPost } from './../models/auth';
import { UserService } from './../services/user-service';
import { ActivatedRoute, Router } from '@angular/router';
import { Component, OnInit } from '@angular/core';

@Component({
  selector: 'app-invites-confirm',
  templateUrl: './invites-confirm.component.html',
  styleUrls: ['./invites-confirm.component.scss']
})
export class InvitesConfirmComponent implements OnInit {
  auth: Auth = new Auth();
  authPost: AuthPost = new AuthPost();
  msgs: Message[] = [];
  isLogedOut: boolean = false;
  varInterval: any;
  inviteToken;
  companyName;
  companyDomain;
  email;
  memberShipConfirm: MembershipConfirm = new MembershipConfirm();
  isConfirmed: boolean = false;
  constructor(private route: ActivatedRoute, private userService: UserService, private router: Router,
  private memberShipService: MembershipService) { }

  ngOnInit() {
    if (this.userService.isLoggedIn()) {
      this.logOut();
    }else {
      this.isLogedOut = true;
    }
    let para = this.route.params['_value'];
    console.log(para);
    this.inviteToken = para.token;
    this.companyName = para.name;
    this.companyDomain = para.domain;
    // this.varInterval = setInterval(() => this.confirmInvite(), 100);
  }
  logOut(): void {
    let userInfo = localStorage.getItem('UserInfo');
    let userObj = JSON.parse(userInfo);
    this.email = userObj.user.email;
    this.auth.access_token = userObj.user.token;
    this.auth.client = userObj.user.client;
    this.auth.uid = userObj.user.uid;
    this.authPost.auth = this.auth;
    this.userService.logOut(this.authPost).then(
      (data) => {
        localStorage.removeItem('UserInfo');
        let content = 'Logged out';
        this.msgs = [];
        this.msgs.push({severity: 'success', summary: 'Success', detail: content});
        this.isLogedOut = true;
      },
      (error) => {
        let content = JSON.parse(error['_body']).error;
        this.msgs = [];
        this.msgs.push({severity: 'error', summary: 'Error', detail: content});
        }
    );
  }

  confirmInvite() {
    if (!this.isLogedOut) {
      return;
    }else {
      this.memberShipConfirm.email = this.email;
      this.memberShipConfirm.token = this.inviteToken;
      this.memberShipService.confirmMemberShip(this.memberShipConfirm)
      .then(res => {
        this.isConfirmed = true;
        let content = 'Confirm Success';
        this.msgs = [];
        this.msgs.push({severity: 'success', summary: 'Success', detail: content});
      })
      .catch(error => {
        let content = JSON.parse(error['_body']).error;
        this.msgs = [];
        this.msgs.push({severity: 'error', summary: 'Error', detail: content});
      });
      // clearInterval(this.varInterval);
    }
  }

}
