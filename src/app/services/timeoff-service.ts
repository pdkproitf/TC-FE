import { ProjectDefault, ProjectGetAll, ProjectPost, ProjectGetOne, ProjectCategory, ProjectCategoryMember } from './../models/project';
import { User }     from './../models/user';
import { Client }   from './../models/client';
import { Employee } from './../models/employee';
import { Category } from './../models/category';
import { Injectable }       from '@angular/core';
import { Headers, Http }    from '@angular/http';
import { HeadersService }   from './headers-service';
import 'rxjs/add/operator/toPromise';

@Injectable()
export class TimeoffService {
    headersService: HeadersService = new HeadersService();
    projectUrl: String = 'https://timecloudbackend.herokuapp.com/api/projects';

    constructor(private http: Http) {}

    private handleError(error: any): Promise<any> {
        console.error('An error occurred', error);
        return Promise.reject(error.message || error);
    }

    addProject(projectPost: ProjectPost): Promise<any> {
        let requestUrl = this.projectUrl +'';
        let headers = new Headers;
        this.headersService.createAuthHeaders(headers);
        return this.http
        .post(requestUrl, JSON.stringify(projectPost), {headers: headers})
        .toPromise()
        .then(res => res.json())
        .catch(this.handleError);
    }
}
