import { Router } from '@angular/router';
import { HeadersService }   from './headers-service';
import { Headers, Http }    from '@angular/http';
import { Injectable }       from '@angular/core';
import 'rxjs/add/operator/toPromise';
import { ServerDomain } from '../models/server-domain';

@Injectable()
export class ProjectJoinService {
    headersService: HeadersService = new HeadersService();
    projectUrl: string = new ServerDomain().domain + '/projects';

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

    getProjectJoin(): Promise<any> {
        let requestUrl = this.projectUrl + '/assigned';
        let headers = new Headers;
        this.headersService.createAuthHeaders(headers);
        return this.http
        .get(requestUrl, {headers: headers})
        .toPromise()
        .then(res => res.json().data)
        .catch(err => this.handleError(err));
    }
}
