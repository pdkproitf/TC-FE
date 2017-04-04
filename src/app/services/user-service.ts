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

    constructor(private http: Http) {
        this.LoggedIn = !!localStorage.getItem('UserInfo');
    }

    private handleError(error: any): Promise<any> {
        console.error('An error occurred', error);
        return Promise.reject(error.message || error);
    }

    isLoggedIn(): boolean {
        this.LoggedIn = !!localStorage.getItem('UserInfo');
        return this.LoggedIn;
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
}
