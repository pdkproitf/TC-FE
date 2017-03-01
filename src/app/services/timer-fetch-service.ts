import { HeadersService } from './headers-service';
import { User } from './../models/user';
import { Headers, Http } from '@angular/http';
import { Injectable } from '@angular/core';
import 'rxjs/add/operator/toPromise';
@Injectable()
export class TimerFetchService {
    headersService: HeadersService = new HeadersService();
    constructor(private http: Http) { }

    private handleError(error: any): Promise<any> {
        console.error('An error occurred', error);
        return Promise.reject(error.message || error);
    }

    getTimerFetch(from: string, to: string): Promise<any> {
        let requestUrl = 'https://timecloudbackend.herokuapp.com/api/timers?period[from_day]=' +
        from + '&period[to_day]=' + to;
        let headers = new Headers();
        this.headersService.createAuthHeaders(headers);
        return this.http
        .get(requestUrl, {headers: headers})
        .toPromise()
        .then(res => res.json())
        .catch(err => this.handleError(err));
    }

    getRecentTasks(num): Promise<any> {
        let requestUrl = 'https://timecloudbackend.herokuapp.com/api/tasks/recent?number=' + num;
        let headers = new Headers();
        this.headersService.createAuthHeaders(headers);
        return this.http
        .get(requestUrl, {headers: headers})
        .toPromise()
        .then(res => res.json())
        .catch(err => this.handleError(err));
    }
}
