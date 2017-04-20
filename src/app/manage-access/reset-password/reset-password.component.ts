import { UserService } from './../../services/user-service';
import { Message } from 'primeng/primeng';
import { Router, ActivatedRoute } from '@angular/router';
import { Component, OnInit } from '@angular/core';

@Component({
  selector: 'app-reset-password',
  templateUrl: './reset-password.component.html',
  styleUrls: ['./reset-password.component.scss']
})
export class ResetPasswordComponent implements OnInit {
  msgs: Message[] = [];
  password: string = '';
  token: string = '';
  constructor(private router: Router, private route: ActivatedRoute,
  private userService: UserService) { }

  ngOnInit() {
    let para = this.route.params['_value'];
    this.token = para.token;
    console.log(this.token);
  }

  signUp() {
    this.router.navigate(['sign-up']);
  }

  resetPassword(){
    this.userService.resetPassword(this.password, this.token)
    .then(res => {
      console.log(res);
    })
    .catch(err => {
      console.log(err);
    })
  }

}
