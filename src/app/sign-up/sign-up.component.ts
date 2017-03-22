import { Message } from 'primeng/primeng';
import { ActivatedRoute, Router } from '@angular/router';
import { UserService } from './../services/user-service';
import { User, UserPost } from './../models/user';
import { Component, OnInit } from '@angular/core';
@Component({
  selector: 'app-sign-up',
  templateUrl: './sign-up.component.html',
  styleUrls: ['./sign-up.component.scss']
})
export class SignUpComponent implements OnInit {
  msgs: Message[] = [];
  user: User = new User();
  userPost: UserPost = new UserPost();
  submitted: boolean = false;
  isInvited: boolean = false;
  companyName: string = '';
  constructor( private userService: UserService, private route: ActivatedRoute, private router: Router) { }

  ngOnInit() {
    let para = this.route.params['_value'];
    if (para['token']) {
      this.isInvited = true;
      this.user.invited_token = para['token'];
      this.companyName = para['companyName'];
    }else {
      this.isInvited = false;
    }
  }

  submit(): void {
    this.user.password_confirmation = this.user.password;
    let arrayName = this.user.name.split(' ');
    this.user.first_name = arrayName[0];
    this.user.last_name = arrayName[1];
    this.userPost.user = this.user;
    this.userService.signUp(this.userPost).then((res) => {
      console.log(res);
      this.submitted = true;
    }).catch(err => {
      let content = JSON.parse(err['_body']).error;
      this.msgs = [];
      this.msgs.push({severity: 'error', summary: 'Error', detail: content});
    });
  }

  log() {
    console.log(this.user);
  }

  signIn() {
    this.router.navigate(['sign-in']);
  }

}
