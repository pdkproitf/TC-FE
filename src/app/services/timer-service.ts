import { Router } from '@angular/router';
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

    addNewTimer(timePost: TimerPost): Promise<any> {
        let requestUrl = this.serverdomain.domain + '/timers';
        let headers = new Headers();
        this.headersService.createAuthHeaders(headers);
        let offset = new Date().getTimezoneOffset();
        let timeDifference = offset * 60 * 1000;
        let startTime = new Date(timePost.timer.start_time).getTime() - timeDifference;
        let stopTime = new Date(timePost.timer.stop_time).getTime() - timeDifference;
        timePost.timer.start_time = new Date(startTime).toString();
        timePost.timer.stop_time = new Date(stopTime).toString();
        return this.http
        .post(requestUrl, JSON.stringify(timePost), {headers: headers})
        .toPromise()
        .then(res => {
            let timer = res.json();
            let newStartTime = new Date(timer.start_time).getTime() + timeDifference;
            let newStopTime = new Date(timer.stop_time).getTime() + timeDifference;
            timer.start_time = new Date(newStartTime);
            timer.stop_time = new Date(newStopTime);
            return timer;
        })
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
        let requestUrl = this.serverdomain.domain + '/timers/' + id.toString();
        let headers = new Headers();
        this.headersService.createAuthHeaders(headers);
        let offset = new Date().getTimezoneOffset();
        let timeDifference = offset * 60 * 1000;
        let startTime = new Date(timerPut.timer_update.start_time).getTime() - timeDifference;
        let stopTime = new Date(timerPut.timer_update.stop_time).getTime() - timeDifference;
        timerPut.timer_update.start_time = new Date(startTime).toString();
        timerPut.timer_update.stop_time = new Date(stopTime).toString();
        console.log(JSON.stringify(timerPut));
        return this.http
        .put(requestUrl, JSON.stringify(timerPut), {headers: headers})
        .toPromise()
        .then(res => {
            let timer = res.json().data;
            let newStartTime = new Date(timer.start_time).getTime() + timeDifference;
            let newStopTime = new Date(timer.stop_time).getTime() + timeDifference;
            timer.start_time = new Date(newStartTime);
            timer.stop_time = new Date(newStopTime);
            return timer;
        })
        .catch(err => this.handleError(err));

    }
}
