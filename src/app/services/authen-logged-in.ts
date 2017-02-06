import { UserService } from './user-service';
import { Injectable } from '@angular/core';
import { Router, CanActivate, ActivatedRouteSnapshot, RouterStateSnapshot } from '@angular/router';
@Injectable()
export class AuthenLoggedIn implements CanActivate{
    constructor( private userService: UserService, private router: Router) {}

    canActivate(route: ActivatedRouteSnapshot, state: RouterStateSnapshot): boolean {
        let url: string = state.url;
        return this.checkLogin(url);
    }

    checkLogin(url: string): boolean {
    if (this.userService.isLoggedIn()) {
      return true;
    }
    this.userService.redirectUrl = url;
    this.router.navigate(['/sign-in']);
    return false;
  }

}