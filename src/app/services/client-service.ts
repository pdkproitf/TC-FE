import { ClientPost } from './../models/client';
import { HeadersService } from './headers-service';
import { Headers, Http } from '@angular/http';
import { Injectable } from '@angular/core';
import 'rxjs/add/operator/toPromise';
@Injectable()
export class ClientService {
    headersService: HeadersService = new HeadersService();

    constructor(private http: Http) {}

    private handleError(error: any): Promise<any> {
        console.error('An error occurred', error);
        return Promise.reject(error.message || error);
    }

    addClient(clientPost: ClientPost): Promise<any> {
        let requestUrl = 'https://timecloudbackend.herokuapp.com//api/clients/new';
        let headers = new Headers();
        this.headersService.createAuthHeaders(headers);
        return this.http
        .post(requestUrl, JSON.stringify(clientPost), {headers: headers})
        .toPromise()
        .then(res => res.json().data)
        .catch(this.handleError);
    }
}
