import { UserService } from '../../services/user-service';
import { VerifyEmail, VerifyEmailPost } from '../../models/verify-email';
import { Router, ActivatedRoute, Params } from '@angular/router';
import { Component, OnInit } from '@angular/core';

@Component({
  selector: 'app-verify-email-page',
  templateUrl: './verify-email-page.component.html',
  styleUrls: ['./verify-email-page.component.css']
})
export class VerifyEmailPageComponent implements OnInit {
  token: string;
  verifyEmail: VerifyEmail = new VerifyEmail();
  verifyEmailPost: VerifyEmailPost = new VerifyEmailPost();

  constructor(private router: Router, private route: ActivatedRoute, private userService: UserService) { }

  ngOnInit() {
    //let tok = this.route.params['_value'].token;
    /*this.verifyEmail.confirmation_token = tok;
    this.verifyEmailPost.user = this.verifyEmail;
    this.userService.confirm(this.verifyEmailPost)
    .then((res) => console.log(res),
    (error) => console.log(error));*/
    let acs = '';
    let client_id = '';
    let config = '';
    let expiry = '';
    let token = '';
    let uid = '';
    this.route.queryParams.subscribe( params => {
      token = params['token'];
      client_id = params['client_id'];
      uid = params['uid'];
    });
    console.log(token);
    console.log(client_id);
    console.log(uid);
  }

}
