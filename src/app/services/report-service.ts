import { Router } from '@angular/router';
import { HeadersService } from './headers-service';
import { Headers, Http } from '@angular/http';
import { Injectable } from '@angular/core';
import { ServerDomain } from '../models/server-domain';
import 'rxjs/add/operator/toPromise';

@Injectable()
export class ReportService {
    headersService: HeadersService = new HeadersService();
    constructor(private http: Http, private router: Router) {
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
        .then(res => {
            let report = res.json().data;
            console.log(report);
            let offset = new Date().getTimezoneOffset();
            let timeDifference = offset * 60 * 1000;
            for (let ot of report.overtime) {
                let startTime = new Date(ot.start_time).getTime() + timeDifference;
                let stopTime = new Date(ot.stop_time).getTime() + timeDifference;
                ot.start_time = new Date(startTime);
                ot.stop_time = new Date(stopTime);
                }
            return report;
            }
        )
        .catch(error => this.handleError(error));
    }

    getReportAdvances(from_date: Date, to_date: Date, projects: number[], categories: string[], peoples: number[]): Promise<any> {
        let requestUrl = new ServerDomain().domain + '/reportadvances?from_date=' +
                JSON.stringify(from_date) + '&to_date=' + JSON.stringify(to_date) +
                '&projects=' + JSON.stringify(projects) + '&categories=' +
                JSON.stringify(categories) + '&peoples=' + JSON.stringify(peoples);

        let headers = new Headers();
        this.headersService.createAuthHeaders(headers);
        return this.http
        .get(requestUrl, {headers: headers})
        .toPromise()
        .then(res => res.json().data)
        .catch(err => this.handleError(err));
    }
}
