import { ServerDomain } from './../models/server-domain';
import { Router } from '@angular/router';
import { HeadersService } from './headers-service';
import { Headers, Http } from '@angular/http';
import { Injectable } from '@angular/core';
import 'rxjs/add/operator/toPromise';

@Injectable()
export class RolesService {
    serverDomain: ServerDomain = new ServerDomain();
    headersService: HeadersService = new HeadersService();
    constructor(private http: Http, private router: Router) { }

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

    getAllRoles(): Promise<any> {
        let requestUrl = this.serverDomain.domain + '/roles';
        let headers = new Headers();
        this.headersService.createAuthHeaders(headers);
        return this.http
        .get(requestUrl, {headers: headers})
        .toPromise()
        .then(res => res.json().data)
        .catch(error => this.handleError(error));
    }
}
