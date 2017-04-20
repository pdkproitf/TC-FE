import { Message } from 'primeng/primeng';
import { UserService } from './../../services/user-service';
import { Router } from '@angular/router';
import { Component, OnInit } from '@angular/core';

@Component({
  selector: 'app-forgot-password',
  templateUrl: './forgot-password.component.html',
  styleUrls: ['./forgot-password.component.scss']
})
export class ForgotPasswordComponent implements OnInit {
  email: string;
  msgs: Message[] = [];
  isSubmitted: boolean = false;
  constructor(private router: Router, private userService: UserService) { }

  ngOnInit() {
  }

  signUp() {
    this.router.navigate(['sign-up']);
  }

  forgotPassword() {
    this.userService.forgotPassword(this.email)
    .then(res => {
      console.log(res);
      this.isSubmitted = true;
    })
    .catch(error => {
      let content = JSON.parse(error['_body']).error;
      this.msgs = [];
      this.msgs.push({severity: 'error', summary: 'Error', detail: content});
    });
  }
}
