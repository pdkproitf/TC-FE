import { Component, OnInit } from '@angular/core';
@Component({
  selector: 'app-profile',
  templateUrl: './profile.component.html',
  styleUrls: ['./profile.component.scss']
})
export class ProfileComponent implements OnInit {
  firstName: string;
  lastName: string;
  avatar: string = 'assets/image-profile/default-avatar.png';
  email: string;
  role: string;
  company: string;
  navClass = ['choosing', ''];
  constructor() { }

  ngOnInit() {
    let userInfo = localStorage.getItem('UserInfo');
    let userObj = JSON.parse(userInfo);
    this.firstName = userObj.user.first_name;
    this.lastName = userObj.user.last_name;
    this.email = userObj.user.email;
    this.role = userObj.role.name;
    this.company = userObj.company.name;
    if (userObj.user.image !== null) {
      this.avatar = userObj.user.image;
    }
    console.log(userObj);
  }

  changeClass(a) {
    let len = this.navClass.length;
    for (let i = 0; i < len; i++) {
      this.navClass[i] = '';
    }
    this.navClass[a] = 'choosing';
  }

}
