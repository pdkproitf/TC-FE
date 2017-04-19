import { Message } from 'primeng/primeng';
import { Router } from '@angular/router';
import { Component, OnInit } from '@angular/core';

@Component({
  selector: 'app-reset-password',
  templateUrl: './reset-password.component.html',
  styleUrls: ['./reset-password.component.scss']
})
export class ResetPasswordComponent implements OnInit {
  msgs: Message[] = [];
  password: string = '';
  constructor(private router: Router) { }

  ngOnInit() {
  }

  signUp() {
    this.router.navigate(['sign-up']);
  }

}
