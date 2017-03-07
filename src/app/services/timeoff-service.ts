import { TimeOff, TimeOffPost, TimeOffGetAll, TimeOffPut } from './../models/timeoff';
import { HeadersService }       from './headers-service';
import { Headers, Http }        from '@angular/http';
import { ServerDomain }         from '../models/server-domain';
import { Injectable }           from '@angular/core';
import 'rxjs/add/operator/toPromise';

@Injectable()
export class TimeoffService {
    headersService: HeadersService = new HeadersService();
    timeoffUrl: String = new ServerDomain().domain + '/timeoffs';

    constructor(private http: Http) {}

    private handleError(error: any): Promise<any> {
        console.error('An error occurred', error);
        return Promise.reject(error.message || error);
    }

    createTimeOff(timeoffPost: TimeOffPost): Promise<any> {
        let requestUrl = this.timeoffUrl +'';
        let headers = new Headers;
        console.log('data create ', JSON.stringify(timeoffPost));
        this.headersService.createAuthHeaders(headers);
        return this.http
        .post(requestUrl, JSON.stringify(timeoffPost), {headers: headers})
        .toPromise()
        .then(res => res.json())
        .catch(this.handleError);
    }

    // load all timeoff current user under user role.
    getTimeOffs(): Promise<TimeOffGetAll>{
        let requestUrl = this.timeoffUrl + '';
        let headers = new Headers;
        this.headersService.createAuthHeaders(headers);
        return this.http
        .get(requestUrl, {headers: headers})
        .toPromise()
        .then(res => {
            var timeoffs: TimeOffGetAll = new TimeOffGetAll();
            if(res.json().data){
                console.log('get timeoffs', res.json());
                timeoffs = res.json().data as TimeOffGetAll;
            }
            return timeoffs;
        })
        .catch(this.handleError);
    }

    answerTimeOff(id: number, answer_object: TimeOffPut){
        let requestUrl = this.timeoffUrl + '/'+id;
        let headers = new Headers;
        this.headersService.createAuthHeaders(headers);
        return this.http
        .put(requestUrl, JSON.stringify(answer_object) ,{headers: headers})
        .toPromise()
        .then(res => {
            var timeoffs: TimeOffGetAll = new TimeOffGetAll();
            if(res.json().data){
                console.log('get timeoffs', res.json());
                timeoffs = res.json().data as TimeOffGetAll;
            }
            return timeoffs;
        })
        .catch(this.handleError);
    }
}
