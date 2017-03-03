import { ProjectInDivComponent } from './../project-in-div/project-in-div.component';
import { TimerPost, TimerPut } from './../models/timer';
import { HeadersService } from './headers-service';
import { Headers, Http } from '@angular/http';
import { Injectable } from '@angular/core';
import 'rxjs/add/operator/toPromise';
import { ServerDomain } from '../models/server-domain';

@Injectable()
export class TimerService {
    headersService: HeadersService = new HeadersService();
    serverdomain: ServerDomain = new ServerDomain();

    constructor(private http: Http) {
    }

    private handleError(error: any): Promise<any> {
        console.error('An error occurred', error);
        return Promise.reject(error.message || error);
    }

    addNewTimer(timePost: TimerPost): Promise<any> {
        let requestUrl = this.serverdomain.domain + '/timers';
        let headers = new Headers();
        this.headersService.createAuthHeaders(headers);
        return this.http
        .post(requestUrl, JSON.stringify(timePost), {headers: headers})
        .toPromise()
        .then(res => res.json())
        .catch(err => this.handleError(err));
    }

    deleteTimer(id: number): Promise<any> {
        let requestUrl = this.serverdomain.domain + '/timers/' + id.toString();
        let headers = new Headers();
        this.headersService.createAuthHeaders(headers);
        return this.http
        .delete(requestUrl, {headers: headers})
        .toPromise()
        .then(res => res.json())
        .catch(err => this.handleError(err));
    }

    editTimer(id: number, timerPut: TimerPut): Promise<any> {
        let requestUrl = 'https://timecloudbackend.herokuapp.com/api/timers/' + id.toString();
        let headers = new Headers();
        this.headersService.createAuthHeaders(headers);
        return this.http
        .put(requestUrl, JSON.stringify(timerPut), {headers: headers})
        .toPromise()
        .then(res => res.json().data)
        .catch(err => this.handleError(err));

    }
}
