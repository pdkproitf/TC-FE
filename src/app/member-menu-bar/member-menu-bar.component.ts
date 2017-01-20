import { Router } from '@angular/router';
import { User } from './../models/user';
import { MenuItem } from 'primeng/primeng';
import { Component, OnInit } from '@angular/core';
@Component({
  selector: 'app-member-menu-bar',
  templateUrl: './member-menu-bar.component.html',
  styleUrls: ['./member-menu-bar.component.scss']
})
export class MemberMenuBarComponent implements OnInit {
  items: MenuItem[];
  user: User = new User();
  constructor(private router: Router) { }

  ngOnInit() {
    let userInfo = localStorage.getItem('UserInfo');
    this.user.name = JSON.parse(userInfo).name;
    this.items = [
                    {label: 'Profile', icon: 'fa-user-circle'},
                    {label: 'Setting', icon: 'fa-cog'},
                    {label: 'Logout', icon: 'fa-sign-out', command: (event) => {
                        localStorage.removeItem('UserInfo');
                        this.router.navigate(['/']);
                      }
                    }
                ];
  }

}
