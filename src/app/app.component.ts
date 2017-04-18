import { Router, NavigationEnd } from '@angular/router';
import { Component } from '@angular/core';

@Component({
  selector: 'app-root',
  templateUrl: './app.component.html',
  styleUrls: ['./app.component.css']
})
export class AppComponent {
  title = 'app works!';
  isLoggedIn: boolean = false;
  constructor(private router: Router) {
    this.router.events.subscribe(event => {
      if (event instanceof NavigationEnd) {
        console.log('NavigationEnd:', event);
        let currentUser = JSON.parse(localStorage.getItem('UserInfo'));
        console.log(currentUser);
        if (currentUser != null) {
          console.log('logged in');
          this.isLoggedIn = true;
        } else {
          console.log('not logged in');
          this.isLoggedIn = false;
          }
        }
    });
  }
}
