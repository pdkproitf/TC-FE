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
  submitted: boolean = false;
  
  constructor( private userService: UserService) { }

  ngOnInit() {
  }

  submit(): void {
    this.user.password_confirmation = this.user.password;
    let arrayName = this.user.name.split(' ');
    this.user.first_name = arrayName[0];
    this.user.last_name = arrayName[1];
    this.userPost.user = this.user;
    this.userService.signUp(this.userPost).then(() => {
      this.submitted = true;
    }, () => alert('failed'));
  }

  log() {
    console.log(this.user);
  }

}
