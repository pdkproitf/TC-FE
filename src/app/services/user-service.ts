import { Router } from '@angular/router';
import { HeadersService } from './headers-service';
import { User } from './../models/user';
import { Headers, Http } from '@angular/http';
import { Injectable } from '@angular/core';
import 'rxjs/add/operator/toPromise';
import { ServerDomain } from '../models/server-domain';

@Injectable()
export class UserService {
    LoggedIn: boolean = false;
    redirectUrl: string;
    headersService: HeadersService = new HeadersService();
    serverdomain: ServerDomain = new ServerDomain();

    constructor(private http: Http, private router: Router) {
        this.LoggedIn = !!localStorage.getItem('UserInfo');
    }

    private handleError(error: any): Promise<any> {
        console.error('An error occurred', error);
        let userInfo = localStorage.getItem('UserInfo');
        if (error.status === 401 && userInfo != null) {
            alert('Your token is expired');
            localStorage.removeItem('UserInfo');
            this.router.navigate(['sign-in']);
        }
        return Promise.reject(error.message || error);
    }

    isLoggedIn(): boolean {
        this.LoggedIn = !!localStorage.getItem('UserInfo');
        return this.LoggedIn;
    }

    isAdmin(): boolean {
        if (this.LoggedIn) {
            let userInfo = localStorage.getItem('UserInfo');
            let userObj = JSON.parse(userInfo);
            if (userObj.role.name === 'Admin') {
                return true;
            }
        }
        return false;
    }

    isHighPM(): boolean {
        if (this.LoggedIn) {
            let userInfo = localStorage.getItem('UserInfo');
            let userObj = JSON.parse(userInfo);
            if (userObj.role.name === 'PM' || userObj.role.name === 'Admin') {
                return true;
                }
            }
        return false;
    }

    isNormalPM(): boolean {
        if (this.LoggedIn) {
            let userInfo = localStorage.getItem('UserInfo');
            let userObj = JSON.parse(userInfo);
            if (userObj.role.name === 'PM' || userObj.role.name === 'Admin' || userObj.pm_projects > 0) {
                return true;
                }
            }
        return false;
    }

    signUp(user): Promise<any> {
        let requestUrl = this.serverdomain.domain + '/users';
        let headers = new Headers;
        this.headersService.createAuthHeaders(headers);
        return this.http
        .post(requestUrl, JSON.stringify(user), {headers: headers})
        .toPromise()
        .then(res => res.json().data)
        .catch(this.handleError);
    }

    signIn(user): Promise<any>{
        let requestUrl = this.serverdomain.domain + '/users/sign-in';
        let headers = new Headers;
        this.headersService.createAuthHeaders(headers);
        return this.http
        .post(requestUrl, JSON.stringify(user), {headers: headers})
        .toPromise()
        .then(res => res.json().data)
        .catch(this.handleError);
    }

    logOut(auth): Promise<any> {
        let requestUrl = this.serverdomain.domain + '/users/sign-out';
        let headers = new Headers;
        this.headersService.createAuthHeaders(headers);
        return this.http
        .post(requestUrl, JSON.stringify(auth), {headers: headers})
        .toPromise()
        .then( res => res.json().data)
        .catch(this.handleError);
    }

    confirm(verifyEmail): Promise<any>{
        let requestUrl = this.serverdomain.domain + '/users/confirmation?user[confirmation_token]='
        + verifyEmail.user.confirmation_token;
        let headers = new Headers;
        this.headersService.createAuthHeaders(headers);
        return this.http
        .get(requestUrl, {headers: headers})
        .toPromise()
        .then(res => res.json().data)
        .catch(this.handleError);
    }

    editProfile(userPut: any): Promise<any> {
        let requestUrl = this.serverdomain.domain + '/users';
        let headers = new Headers();
        this.headersService.createAuthHeaders(headers);
        return this.http
        .put(requestUrl, JSON.stringify(userPut), {headers: headers})
        .toPromise()
        .then(res => {
            console.log(res.json());
            return res.json();
        })
        .catch(error => this.handleError(error));
    }

    forgotPassword(email: string): Promise<any> {
        let requestUrl = this.serverdomain.domain + '/users/password';
        let headers = new Headers();
        this.headersService.createAuthHeaders(headers);
        let redirectUrl = 'http://localhost:4200/reset-password/';
        // let redirectUrl = 'https://spring-time-tracker.herokuapp.com/';
        let userPost = {
            user: {
                email: email,
                redirect_url: redirectUrl
            }
        };
        return this.http
        .post(requestUrl, JSON.stringify(userPost), {headers: headers})
        .toPromise()
        .then(res => res.json().data)
        .catch(err => this.handleError(err));
    }

    resetPassword(password: string, confirmationToken: string): Promise<any> {
        let requestUrl = this.serverdomain.domain + '/users/password';
        let headers = new Headers();
        this.headersService.createAuthHeaders(headers);
        let userPost = {
            user: {
                confirmation_token: confirmationToken,
                password: password,
                password_confirmation: password
            }
        };
        return this.http
        .put(requestUrl, JSON.stringify(userPost), {headers: headers})
        .toPromise()
        .then(res => res.json())
        .catch(err => this.handleError(err));
    }
}
