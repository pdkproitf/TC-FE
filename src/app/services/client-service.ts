import { ClientPost } from './../models/client';
import { HeadersService } from './headers-service';
import { Headers, Http } from '@angular/http';
import { Injectable } from '@angular/core';
import { ServerDomain } from '../models/server-domain';
import 'rxjs/add/operator/toPromise';

@Injectable()
export class ClientService {
    headersService: HeadersService = new HeadersService();
    serverdomain: ServerDomain = new ServerDomain();
    constructor(private http: Http) {}

    private handleError(error: any): Promise<any> {
        console.error('An error occurred', error);
        return Promise.reject(error.message || error);
    }

    addClient(clientPost: ClientPost): Promise<any> {
        let requestUrl = this.serverdomain.domain + '/clients';
        let headers = new Headers();
        this.headersService.createAuthHeaders(headers);
        return this.http
        .post(requestUrl, JSON.stringify(clientPost), {headers: headers})
        .toPromise()
        .then(res => res.json())
        .catch(this.handleError);
    }

    getAllClient(): Promise<any> {
        let requestUrl = this.serverdomain.domain +'/clients';
        let headers = new Headers();
        this.headersService.createAuthHeaders(headers);
        return this.http
        .get(requestUrl, {headers: headers})
        .toPromise()
        .then(res => res.json())
        .catch(this.handleError);
    }
}
