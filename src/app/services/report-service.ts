import { HeadersService } from './headers-service';
import { Headers, Http } from '@angular/http';
import { Injectable } from '@angular/core';
import { ServerDomain } from '../models/server-domain';
import 'rxjs/add/operator/toPromise';

@Injectable()
export class ReportService {
    headersService: HeadersService = new HeadersService();
    constructor(private http: Http) {
    }

    private handleError(error: any): Promise<any> {
        console.error('An error occurred', error);
        return Promise.reject(error.message || error);
    }

    getReportAll(begin: string, end: string): Promise<any> {
        let serverDomain = new ServerDomain();
        let requestUrl = serverDomain.domain + '/reports/time?begin_date=' + begin + '&end_date=' + end;
        let headers = new Headers();
        this.headersService.createAuthHeaders(headers);
        return this.http
        .get(requestUrl, {headers: headers})
        .toPromise()
        .then(res => res.json().data)
        .catch(error => this.handleError(error));
    }

    getReportDetailProject(begin: string, end: string, id: number): Promise<any> {
        let serverDomain = new ServerDomain();
        let requestUrl = serverDomain.domain + '/reports/project?begin_date=' + begin + '&end_date=' + end + '&project_id=' + id.toString();
        let headers = new Headers();
        this.headersService.createAuthHeaders(headers);
        return this.http
        .get(requestUrl, {headers: headers})
        .toPromise()
        .then(res => res.json().data)
        .catch(error => this.handleError(error));
    }

    getReportDetailPerson(begin: string, end: string, id: number): Promise<any> {
        let serverDomain = new ServerDomain();
        let requestUrl = serverDomain.domain + '/reports/member?begin_date=' + begin + '&end_date=' + end + '&member_id=' + id.toString();
        let headers = new Headers();
        this.headersService.createAuthHeaders(headers);
        return this.http
        .get(requestUrl, {headers: headers})
        .toPromise()
        .then(res => res.json().data)
        .catch(error => this.handleError(error));
    }

    getReportAdvances(): Promise<any> {
        let requestUrl = new ServerDomain().domain + '/reportadvances';
        let headers = new Headers();
        this.headersService.createAuthHeaders(headers);
        return this.http
        .get(requestUrl, {headers: headers})
        .toPromise()
        .then(res => res.json().data)
        .catch(err => this.handleError(err));
    }
}
