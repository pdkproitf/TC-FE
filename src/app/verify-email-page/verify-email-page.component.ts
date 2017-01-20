import { UserService } from './../services/user-service';
import { VerifyEmail, VerifyEmailPost } from './../models/verify-email';
import { Router, ActivatedRoute } from '@angular/router';
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
    let tok = this.route.params['_value'].token;
    this.verifyEmail.confirmation_token = tok;
    this.verifyEmailPost.user = this.verifyEmail;
    this.userService.confirm(this.verifyEmailPost)
    .then((res) => console.log(res),
    (error) => console.log(error));
  }

}
