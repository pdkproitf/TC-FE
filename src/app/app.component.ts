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
  isProfile: boolean = false;
  currentState = null;
  typePage = -1;
  constructor(private router: Router) {
    this.router.events.subscribe(event => {
      if (event instanceof NavigationEnd) {
        console.log('NavigationEnd:', event);
        let currentUser = JSON.parse(localStorage.getItem('UserInfo'));
        console.log(currentUser);
        if (currentUser != null) {
          console.log('logged in');
          this.isLoggedIn = true;
          this.isProfile = false;
          if (event.url.includes('dashboard')) {
            this.currentState = 0;
          }
          if (event.url.includes('project')) {
            this.currentState = 1;
          }
          if (event.url.includes('timeoff')) {
            this.currentState = 2;
          }
          if (event.url.includes('report')) {
            this.currentState = 3;
          }
          if (event.url.includes('manage')) {
            this.currentState = 4;
          }
          if (event.url.includes('profile')) {
            this.isProfile = true;
          }
        } else {
          console.log('not logged in');
          this.isLoggedIn = false;
          if (event.url.includes('sign-in')) {
            this.typePage = 0;
            }
          if (event.url.includes('sign-up')) {
            this.typePage = 1;
            }
          }
        }
    });
  }
}
