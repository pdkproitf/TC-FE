import { Injectable }           from '@angular/core';
import { Headers, Http }        from '@angular/http';
import { HeadersService }       from './headers-service';
import { TimeOff, TimeOffPost } from './../models/timeoff';
import 'rxjs/add/operator/toPromise';

@Injectable()
export class TimeoffService {
    headersService: HeadersService = new HeadersService();
    timeoffUrl: String = 'https://timecloudbackend.herokuapp.com/api/timeoffs';

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
}
