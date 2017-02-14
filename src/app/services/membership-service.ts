import { MembershipPost } from './../models/membership';
import { HeadersService } from './headers-service';
import { Headers, Http } from '@angular/http';
import { Injectable } from '@angular/core';
import 'rxjs/add/operator/toPromise';
@Injectable()
export class MembershipService {
    headersService = new HeadersService();

    constructor(private http: Http) {}

    private handleError(error: any): Promise<any> {
        console.error('An error occurred', error);
        return Promise.reject(error.message || error);
    }

    getAllMembership(): Promise<any> {
        let requestUrl = 'https://timecloudbackend.herokuapp.com/api/memberships';
        let headers = new Headers();
        this.headersService.createAuthHeaders(headers);
        return this.http
        .get(requestUrl, {headers: headers})
        .toPromise()
        .then(res => res.json().data)
        .catch(error => this.handleError(error));
    }

    addNewMembership(memberShipPost: MembershipPost): Promise<any> {
        let requestUrl = 'https://timecloudbackend.herokuapp.com/api/memberships/new';
        let headers = new Headers();
        this.headersService.createAuthHeaders(headers);
        return this.http
        .post(requestUrl, JSON.stringify(memberShipPost), {headers: headers})
        .toPromise()
        .then(res => res.json())
        .catch(error => this.handleError(error));
    }

}
