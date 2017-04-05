import { Router } from '@angular/router';
import { ProjectGetAll, ProjectPost, ProjectGetOne, ProjectCategory, ProjectCategoryMember } from './../models/project';
import { User }     from './../models/user';
import { Member } from './../models/member';
import { Client }   from './../models/client';
import { Employee } from './../models/employee';
import { Category } from './../models/category';
import { Injectable }       from '@angular/core';
import { Headers, Http }    from '@angular/http';
import { HeadersService }   from './headers-service';
import 'rxjs/add/operator/toPromise';
import { ServerDomain } from '../models/server-domain';

@Injectable()
export class ProjectService {
    headersService: HeadersService = new HeadersService();
    projectUrl: String = new ServerDomain().domain + '/projects';

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

    addProject(projectPost: ProjectPost): Promise<any> {
        let requestUrl = this.projectUrl + '';
        let headers = new Headers;
        this.headersService.createAuthHeaders(headers);
        return this.http
        .post(requestUrl, JSON.stringify(projectPost), {headers: headers})
        .toPromise()
        .then(res => res.json())
        .catch(this.handleError);
    }

    //get project under user role with param id.
    getProject(id: String): Promise<ProjectGetOne> {
        let requestUrl = this.projectUrl + '/' + id;
        let headers = new Headers;
        this.headersService.createAuthHeaders(headers);
        return this.http
        .get(requestUrl, {headers: headers})
        .toPromise()
        .then(res => {
            console.log('get project '+id, res.json());
            return res.json().data as ProjectGetOne;
        })
        .catch(this.handleError);
    }

    // load all projects under user role.
    getProjects(): Promise<ProjectGetAll[]> {
        let requestUrl = this.projectUrl + '';
        let headers = new Headers;
        this.headersService.createAuthHeaders(headers);
        return this.http
        .get(requestUrl, {headers: headers})
        .toPromise()
        .then(res => {
            var projects: ProjectGetAll[] = [];
            if(res.json().data){
                // console.log('get projects ', res.json());
                res.json().data.forEach(json => {
                    projects.push(json as ProjectGetAll);
                });
            }
            return projects;
        })
        .catch(this.handleError);
    }

    editProject(id: number, projectPost: ProjectPost): Promise<any> {
        let requestUrl = this.projectUrl + '/' + id.toString();
        let headers = new Headers();
        this.headersService.createAuthHeaders(headers);
        return this.http
        .put(requestUrl, JSON.stringify(projectPost), {headers: headers})
        .toPromise()
        .then(res => res.json())
        .catch(error => this.handleError(error));
    }
}
