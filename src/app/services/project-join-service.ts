import { HeadersService }   from './headers-service';
import { Headers, Http }    from '@angular/http';
import { Injectable }       from '@angular/core';
import 'rxjs/add/operator/toPromise';
import { ServerDomain } from '../models/server-domain';

@Injectable()
export class ProjectJoinService {
    headersService: HeadersService = new HeadersService();
    projectUrl: string = new ServerDomain().domain + '/projects';

    constructor(private http: Http) {}

    private handleError(error: any): Promise<any> {
        console.error('An error occurred', error);
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
