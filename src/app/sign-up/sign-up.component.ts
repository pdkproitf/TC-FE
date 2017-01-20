import { UserService } from './../services/user-service';
import { User, UserPost } from './../models/user';
import { Component, OnInit } from '@angular/core';
@Component({
  selector: 'app-sign-up',
  templateUrl: './sign-up.component.html',
  styleUrls: ['./sign-up.component.scss']
})
export class SignUpComponent implements OnInit {
  user: User = new User();
  userPost: UserPost = new UserPost();
  constructor( private userService: UserService) { }

  ngOnInit() {
  }
  submit(): void {
    this.userPost.user = this.user;
    this.userService.signUp(this.userPost).then(() => {
      alert('success');
    }, () => alert('failed'));
  }
  log() {
    console.log(this.user);
  }

}
