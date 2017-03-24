import { Message } from 'primeng/primeng';
import { UserService } from './../services/user-service';
import { Auth, AuthPost } from './../models/auth';
import { Router } from '@angular/router';
import { User } from './../models/user';
import { MenuItem } from 'primeng/primeng';
import { Component, OnInit, Input } from '@angular/core';
@Component({
  selector: 'app-member-menu-bar',
  templateUrl: './member-menu-bar.component.html',
  styleUrls: ['./member-menu-bar.component.scss']
})
export class MemberMenuBarComponent implements OnInit {
  msgs: Message[] = [];
  items: MenuItem[];
  user: User = new User();
  auth: Auth = new Auth();
  authPost: AuthPost = new AuthPost();
  imageUrl: string;
  @Input()
  currentState: number = 0;
  classActive: string[] = ['', '', '', '', ''];

  constructor(private router: Router, private userService: UserService) { }

  ngOnInit() {
    this.classActive[this.currentState] = 'active';
    let userInfo = localStorage.getItem('UserInfo');
    let userObj = JSON.parse(userInfo);
    // console.log(userObj);
    this.user.name = userObj.user.first_name;
    this.imageUrl = userObj.user.image;
    this.items = [
                    {label: 'Profile', icon: 'fa-user-circle', command: (event) => {
                      this.router.navigate(['profile']);
                    }},
                    {label: 'Setting', icon: 'fa-cog'},
                    {label: 'Logout', icon: 'fa-sign-out', command: (event) => {
                      this.logOut();
                      }
                    }
                ];
  }

  logOut(): void {
    let userInfo = localStorage.getItem('UserInfo');
    let userObj = JSON.parse(userInfo);
    console.log(userObj);
    this.auth.access_token = userObj.user.token;
    this.auth.client = userObj.user.client;
    this.auth.uid = userObj.user.uid;
    this.authPost.auth = this.auth;
    this.userService.logOut(this.authPost).then(
      (data) => {
        localStorage.removeItem('UserInfo');
        this.router.navigate(['/']);
        let content = 'Logged out';
        this.msgs = [];
        this.msgs.push({severity: 'success', summary: 'Success', detail: content});
      },
      (error) => {
        let content = JSON.parse(error['_body']).error;
        this.msgs = [];
        this.msgs.push({severity: 'error', summary: 'Error', detail: content});
        }
    );
  }

}
