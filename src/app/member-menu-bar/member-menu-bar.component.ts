import { Component, OnInit } from '@angular/core';
import { MenuModule, MenuItem } from 'primeng/primeng';
@Component({
  selector: 'app-member-menu-bar',
  templateUrl: './member-menu-bar.component.html',
  styleUrls: ['./member-menu-bar.component.scss']
})
export class MemberMenuBarComponent implements OnInit {
  items: MenuItem[];
  constructor() { }

  ngOnInit() {
    this.items = [
                    {label: 'Profile', icon: 'fa-user-circle'},
                    {label: 'Logout', icon: 'fa-sign-out'},
                    {label: 'Setting', icon: 'fa-cog'}
                ];
  }

}
