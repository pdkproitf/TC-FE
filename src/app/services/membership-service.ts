import { Router } from '@angular/router';
import { MembershipPost, MembershipConfirm } from './../models/membership';
import { HeadersService } from './headers-service';
import { Headers, Http } from '@angular/http';
import { Injectable } from '@angular/core';
import 'rxjs/add/operator/toPromise';
import { ServerDomain } from '../models/server-domain';

@Injectable()
export class MembershipService {
    headersService = new HeadersService();
    serverdomain: ServerDomain = new ServerDomain();
    constructor(private http: Http, private router: Router) {}

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

    getAllMembership(): Promise<any> {
        let requestUrl = this.serverdomain.domain + '/members';
        let headers = new Headers();
        this.headersService.createAuthHeaders(headers);
        return this.http
        .get(requestUrl, {headers: headers})
        .toPromise()
        .then(res => res.json().data)
        .catch(error => this.handleError(error));
    }

    addNewMembership(memberShipPost): Promise<any> {
        let requestUrl = this.serverdomain.domain + '/invites';
        let headers = new Headers();
        this.headersService.createAuthHeaders(headers);
        return this.http
        .post(requestUrl, JSON.stringify(memberShipPost), {headers: headers})
        .toPromise()
        .then(res => res.json())
        .catch(error => this.handleError(error));
    }

    confirmMemberShip(memberShipConfirm: MembershipConfirm): Promise<any> {
        let requestUrl = this.serverdomain.domain + '/invites';
        let headers = new Headers();
        this.headersService.createAuthHeaders(headers);
        return this.http
        .put(requestUrl, JSON.stringify(memberShipConfirm), {headers: headers})
        .toPromise()
        .then(res => res.json())
        .catch(error => this.handleError(error));
    }

    editMember(id: number, memberPut: any): Promise<any> {
        let requestUrl = this.serverdomain.domain + '/members/' + id.toString();
        let headers = new Headers();
        this.headersService.createAuthHeaders(headers);
        return this.http
        .put(requestUrl, JSON.stringify(memberPut), {headers: headers})
        .toPromise()
        .then(res => res.json().data)
        .catch(err => this.handleError(err));
    }

}
