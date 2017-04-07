import { Router } from '@angular/router';
import { HeadersService } from './headers-service';
import { Headers, Http } from '@angular/http';
import { Injectable } from '@angular/core';
import 'rxjs/add/operator/toPromise';
import { ServerDomain } from '../models/server-domain';

@Injectable()
export class CompanyService {
    headersService: HeadersService = new HeadersService();
    serverDomain: ServerDomain = new ServerDomain();
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

    getCompany(): Promise<any> {
        let requestUrl = this.serverDomain.domain + '/companies/own';
        let headers = new Headers();
        this.headersService.createAuthHeaders(headers);
        return this.http
        .get(requestUrl, {headers: headers})
        .toPromise()
        .then(res => res.json())
        .catch(err => this.handleError(err));
    }

    putCompany(companyPut: any): Promise<any> {
        let requestUrl = this.serverDomain.domain + '/companies/own';
        let headers = new Headers();
        this.headersService.createAuthHeaders(headers);
        return this.http
        .put(requestUrl, JSON.stringify(companyPut), {headers: headers})
        .toPromise()
        .then(res => res.json())
        .catch(err => this.handleError(err));
    }
}
