import { headers } from './../constants/headers';
import { User } from './../models/user';
import { Headers, Http } from '@angular/http';
import { Injectable } from '@angular/core';
import 'rxjs/add/operator/toPromise';
@Injectable()
export class UserService {
    LoggedIn: boolean = false;
    redirectUrl: string;
    constructor(private http: Http) {
        this.LoggedIn = !!localStorage.getItem('UserInfo');
    }
    private handleError(error: any): Promise<any> {
        console.error('An error occurred', error);
        return Promise.reject(error.message || error);
    }
    signUp(user): Promise<any> {
        let requestUrl = 'https://timecloudbackend.herokuapp.com/api/users';
        return this.http
        .post(requestUrl, JSON.stringify(user), {headers: headers})
        .toPromise()
        .then(res => res.json().data)
        .catch(this.handleError);
    }
    signIn(user): Promise<any>{
        let requestUrl = 'https://timecloudbackend.herokuapp.com/api/users/sign-in';
        return this.http
        .post(requestUrl, JSON.stringify(user), {headers: headers})
        .toPromise()
        .then(res => res.json().data)
        .catch(this.handleError);
    }
    isLoggedIn(): boolean{
        this.LoggedIn = !!localStorage.getItem('UserInfo');
        return this.LoggedIn;
    }
}
