import { UserService } from './../services/user-service';
import { User, UserPost } from './../models/user';
import { Router } from '@angular/router';
import { Component, OnInit } from '@angular/core';

@Component({
  selector: 'app-sign-in',
  templateUrl: './sign-in.component.html',
  styleUrls: ['./sign-in.component.scss']
})
export class SignInComponent implements OnInit {
  user: User = new User();
  userPost: UserPost = new UserPost();

  constructor(private router: Router, private userService: UserService) { }

  ngOnInit() {
  }

  log(): void{
    console.log(this.user);
  }

  signIn(): void {
    console.log('signin');
    this.userPost.user = this.user;
    console.log('somehow');
    this.userService.signIn(this.userPost)
    .then((res) => {
      localStorage.setItem('UserInfo', JSON.stringify(res));
      let obj = localStorage.getItem('UserInfo');
      this.router.navigate(['/dashboard']);
      }, (error) => {
        let content = JSON.parse(error['_body']).error;
        alert(content);
      }
    );
  }

  signUp() {
    this.router.navigate(['sign-up']);
  }
}
