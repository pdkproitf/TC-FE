import { HeadersService }   from './headers-service';
import { Headers, Http }    from '@angular/http';
import { ServerDomain }     from '../models/server-domain';
import { HolidayPost }      from '../models/holiday';
import { Injectable }       from '@angular/core';
import 'rxjs/add/operator/toPromise';

@Injectable()
export class HolidayService {
    headersService: HeadersService = new HeadersService();
    constructor(private http: Http) {
    }

    private handleError(error: any): Promise<any> {
        console.error('An error occurred', error);
        return Promise.reject(error.message || error);
    }

    gets(): Promise<any> {
        let requestUrl = new ServerDomain().domain + '/holidays';
        let headers = new Headers();
        this.headersService.createAuthHeaders(headers);
        return this.http
        .get(requestUrl, {headers: headers})
        .toPromise()
        .then(res => res.json())
        .catch(error => this.handleError(error));
    }

    create(holiday: HolidayPost): Promise<any> {
        console.log('holiday service', JSON.stringify(holiday))
        let requestUrl = new ServerDomain().domain + '/holidays';
        let headers = new Headers();
        this.headersService.createAuthHeaders(headers);
        return this.http
            .post(requestUrl, JSON.stringify(holiday) , {headers: headers})
            .toPromise()
            .then(res => res.json())
            .catch(error => this.handleError(error));
    }

    delete(id: number): Promise<any> {
        let requestUrl = new ServerDomain().domain + '/holidays/' + id;
        let headers = new Headers();
        this.headersService.createAuthHeaders(headers);
        return this.http
            .delete(requestUrl , {headers: headers})
            .toPromise()
            .then(res => res.json())
            .catch(error => this.handleError(error));
    }
}
