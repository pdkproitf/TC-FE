import { Router } from '@angular/router';
import { HeadersService } from './headers-service';
import { User } from './../models/user';
import { Headers, Http } from '@angular/http';
import { Injectable } from '@angular/core';
import 'rxjs/add/operator/toPromise';
import { ServerDomain } from '../models/server-domain';

@Injectable()
export class TimerFetchService {
    headersService: HeadersService = new HeadersService();
    serverdomain: ServerDomain = new ServerDomain();

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

    getTimerFetch(from: string, to: string): Promise<any> {
        let offset = new Date().getTimezoneOffset();
        let timeDifference = offset * 60 * 1000;
        let fromDate = new Date(from);
        let toDate = new Date(to);
        let requestUrl = this.serverdomain.domain + '/timers?period[from_day]=' +
        JSON.stringify(fromDate) + '&period[to_day]=' + JSON.stringify(toDate);
        let headers = new Headers();
        this.headersService.createAuthHeaders(headers);
        return this.http
        .get(requestUrl, {headers: headers})
        .toPromise()
        .then(res => {
            let timerFetchs = res.json();
            let keys = Object.keys(timerFetchs);
            let len = keys.length;
            for (let i = 0; i < len; i ++) {
                let timerFetch = timerFetchs[keys[i]];
                for (let timer of timerFetch) {
                    let startTime = new Date(timer.start_time).getTime() + timeDifference;
                    let stopTime = new Date(timer.stop_time).getTime() + timeDifference;
                    timer.start_time = new Date(startTime);
                    timer.stop_time = new Date(stopTime);
                }
            }
            return timerFetchs;
            }
        )
        .catch(err => this.handleError(err));
    }

    getRecentTasks(num): Promise<any> {
        let requestUrl = this.serverdomain.domain + '/tasks/recent?number=' + num;
        let headers = new Headers();
        this.headersService.createAuthHeaders(headers);
        return this.http
        .get(requestUrl, {headers: headers})
        .toPromise()
        .then(res => res.json())
        .catch(err => this.handleError(err));
    }
}
