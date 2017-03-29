import { TimeOff, TimeOffPost, TimeOffGetAll, PersonNumTimeOff } from './../models/timeoff';
import { HeadersService }       from './headers-service';
import { Headers, Http }        from '@angular/http';
import { ServerDomain }         from '../models/server-domain';
import { Injectable }           from '@angular/core';
import { Member }   from '../models/member';

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
        this.headersService.createAuthHeaders(headers);
        return this.http
        .post(requestUrl, JSON.stringify(timeoffPost), {headers: headers})
        .toPromise()
        .then(res => res.json())
        .catch(this.handleError);
    }

    // get timeoff of current user under user role.
    getTimeOff(id: number): Promise<TimeOff>{
        let requestUrl = this.timeoffUrl + '/'+id;
        let headers = new Headers;
        this.headersService.createAuthHeaders(headers);
        return this.http
        .get(requestUrl, {headers: headers})
        .toPromise()
        .then(res => {
            var timeoff: TimeOff = new TimeOff();
            if(res.json().data){
                // console.log('get timeoff', res.json());
                timeoff = res.json().data as TimeOff;
            }
            return timeoff;
        })
        .catch(this.handleError);
    }

    // load all timeoff current user under user role follow phase
    getPhaseTimeOffs(from_date: Date, to_date: Date): Promise<TimeOffGetAll>{
        let requestUrl = this.timeoffUrl + '?from_date='+JSON.stringify(from_date)+'&to_date='+JSON.stringify(to_date)+'&status=pending';
        // let requestUrl = this.timeoffUrl + '?start_date='+start_date+'&end_date='+end_date;;
        let headers = new Headers;
        this.headersService.createAuthHeaders(headers);
        return this.http
        .get(requestUrl, {headers: headers})
        .toPromise()
        .then(res => {
            var timeoffs: TimeOffGetAll = new TimeOffGetAll();
            if(res.json().data){
                // console.log('get phase timeoffs', res.json());
                timeoffs = res.json().data as TimeOffGetAll;
            }
            return timeoffs;
        })
        .catch(this.handleError);
    }

    // load all timeoff current user under user role follow phasewith member ordinal
    getPhaseTimeOffsMemberOrdinal(from_date: Date, to_date: Date): any{
        let requestUrl = this.timeoffUrl + '?from_date='+JSON.stringify(from_date)+'&to_date='+JSON.stringify(to_date)+'&status=all';
        // let requestUrl = this.timeoffUrl + '?start_date='+start_date+'&end_date='+end_date;;
        let headers = new Headers;
        this.headersService.createAuthHeaders(headers);
        return this.http
        .get(requestUrl, {headers: headers})
        .toPromise()
        .then(res => {
            var hash_timeoff= new  Map<Member, Array<TimeOff>>();
            // console.log('000000000000', res.json().data);
            return res.json().data;
        })
        .catch(this.handleError);
    }

    // load all timeoff
    getAllTimeOffs(){
        let requestUrl = this.timeoffUrl + '';
        let headers = new Headers;
        this.headersService.createAuthHeaders(headers);
        return this.http
        .get(requestUrl, {headers: headers})
        .toPromise()
        .then(res => {
            var timeoffs: TimeOff[] = [];
            if(res.json().data){
                // console.log('get all timeoffs', res.json());
                timeoffs = res.json().data as TimeOff[];
            }
            return timeoffs;
        })
        .catch(this.handleError);
    }

    // load totaltimeoff and rmain timeoff of current person
    getPersonNumTimeOff( id: number = null){
        let requestUrl = this.timeoffUrl + '/num-of-timeoff';
        if(id != null) requestUrl = requestUrl+'?id='+id;
        let headers = new Headers;
        this.headersService.createAuthHeaders(headers);
        return this.http
        .get(requestUrl, {headers: headers})
        .toPromise()
        .then(res => {
            var timeoff = new  PersonNumTimeOff();
            if(res.json().data){
                // console.log('get all timeoffs', res.json());
                timeoff = res.json().data as PersonNumTimeOff;
            }
            return timeoff;
        })
        .catch(this.handleError);
    }

    update(id: number, update_timeoff: Object){
        let requestUrl = this.timeoffUrl + '/'+id;
        let headers = new Headers;
        this.headersService.createAuthHeaders(headers);
        return this.http
        .put(requestUrl, JSON.stringify(update_timeoff) ,{headers: headers})
        .toPromise()
        .then(res => {
            var timeoff: TimeOff = new TimeOff();
            if(res.json().data){
                // console.log('update timeoff '+id, res.json());
                timeoff = res.json().data as TimeOff;
            }
            return timeoff;
        })
        .catch(this.handleError);
    }

    delete(id: number){
        let requestUrl = this.timeoffUrl + '/'+id;
        let headers = new Headers;
        this.headersService.createAuthHeaders(headers);
        return this.http
        .delete(requestUrl, {headers: headers})
        .toPromise()
        .then(res => {
            var timeoff: TimeOff = new TimeOff();
            if(res.json().data){
                // console.log('delete timeoff '+id, res.json());
                timeoff = res.json().data as TimeOff;
            }
            return timeoff;
        })
        .catch(this.handleError);
    }
}
