import { ProjectInDivComponent } from './../project-in-div/project-in-div.component';
import { TimerPost } from './../models/timer';
import { HeadersService } from './headers-service';
import { Headers, Http } from '@angular/http';
import { Injectable } from '@angular/core';
import 'rxjs/add/operator/toPromise';
@Injectable()
export class TimerService {
    headersService: HeadersService = new HeadersService();
    constructor(private http: Http) {
    }

    private handleError(error: any): Promise<any> {
        console.error('An error occurred', error);
        return Promise.reject(error.message || error);
    }

    addNewTimer(timePost: TimerPost): Promise<any> {
        let requestUrl = 'https://timecloudbackend.herokuapp.com/api/timers';
        let headers = new Headers();
        this.headersService.createAuthHeaders(headers);
        return this.http
        .post(requestUrl, timePost, {headers: headers})
        .toPromise()
        .then(res => res.json())
        .catch(err => this.handleError(err));
    }

    deleteTimer(id: number): Promise<any> {
        let requestUrl = 'https://timecloudbackend.herokuapp.com/api/timers/' + id.toString();
        let headers = new Headers();
        this.headersService.createAuthHeaders(headers);
        return this.http
        .delete(requestUrl, {headers: headers})
        .toPromise()
        .then(res => res.json())
        .catch(err => this.handleError(err));
    }
}
