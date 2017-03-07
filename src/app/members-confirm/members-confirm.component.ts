import { ActivatedRoute, Router } from '@angular/router';
import { MembershipService } from './../services/membership-service';
import { MembershipConfirm } from './../models/membership';
import { Component, OnInit } from '@angular/core';

@Component({
  selector: 'app-members-confirm',
  templateUrl: './members-confirm.component.html',
  styleUrls: ['./members-confirm.component.scss']
})
export class MembersConfirmComponent implements OnInit {
  memberShipConfirm: MembershipConfirm = new MembershipConfirm();
  constructor(private membershipService: MembershipService, private route: ActivatedRoute,
  private router: Router) { }

  ngOnInit() {
    let token = this.route.params['_value']['token'];
    console.log(token);
    let userInfo = localStorage.getItem('UserInfo');
    let userObj = JSON.parse(userInfo);
    this.memberShipConfirm.email = userObj.user.email;
    this.memberShipConfirm.token = token;
    console.log(this.memberShipConfirm);
    this.membershipService.confirmMemberShip(this.memberShipConfirm)
    .then(res => {
      console.log(res);
      this.router.navigate(['dashboard']);
    })
    .catch(error => {
      let er = error;
      console.log(er);
      this.router.navigate(['dashboard']);
    });
  }

}
