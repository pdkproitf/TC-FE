import { Router } from '@angular/router';
import { HeadersService } from './headers-service';
import { Headers, Http } from '@angular/http';
import { Injectable } from '@angular/core';
import 'rxjs/add/operator/toPromise';
import { ServerDomain } from '../models/server-domain';

@Injectable()
export class JobService {
    headersService = new HeadersService();
    serverdomain: ServerDomain = new ServerDomain();
    constructor(private http: Http, private router: Router) {}

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

    getAllJobs(): Promise<any> {
        let requestUrl = this.serverdomain.domain + '/jobs';
        let headers = new Headers();
        this.headersService.createAuthHeaders(headers);
        return this.http
        .get(requestUrl, {headers: headers})
        .toPromise()
        .then(res => {
            return res.json().data;
        })
        .catch(error => {
            this.handleError(error);
        });
    }

    addNewJob(jobPost: Object): Promise<any> {
        let requestUrl = this.serverdomain.domain + '/jobs';
        let headers = new Headers();
        this.headersService.createAuthHeaders(headers);
        return this.http
        .post(requestUrl, JSON.stringify(jobPost), {headers: headers})
        .toPromise()
        .then(res => {
            return res.json().data;
        })
        .catch(error => {
            return this.handleError(error);
        });
    }
}
