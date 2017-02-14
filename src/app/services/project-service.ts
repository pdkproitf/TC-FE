import { ProjectDefault, ProjectRecieve, ProjectPost } from './../models/project';
import { Client } from './../models/client';
import { Employee } from './../models/employee';
import { HeadersService }   from './headers-service';
import { Headers, Http }    from '@angular/http';
import { Injectable }       from '@angular/core';
import 'rxjs/add/operator/toPromise';

@Injectable()
export class ProjectService {
    headersService: HeadersService = new HeadersService();
    projectUrl: string = 'https://timecloudbackend.herokuapp.com/api/projects';

    constructor(private http: Http) {}

    private handleError(error: any): Promise<any> {
        console.error('An error occurred', error);
        return Promise.reject(error.message || error);
    }

    addProject(projectPost: ProjectPost): Promise<any> {
        let requestUrl = this.projectUrl;
        let headers = new Headers;
        this.headersService.createAuthHeaders(headers);
        return this.http
        .post(requestUrl, JSON.stringify(projectPost), {headers: headers})
        .toPromise()
        .then(res => res.json())
        .catch(this.handleError);
    }

    //get project under user role with param id.
    getProject(id: String){
        let requestUrl = this.projectUrl + '/'+ id;
        let headers = new Headers;
        this.headersService.createAuthHeaders(headers);
        return this.http
        .get(requestUrl, {headers: headers})
        .toPromise()
        .then(res => {
            console.log('get project '+id, res.json());
        })
        .catch(this.handleError);
    }

    // load all projects under user role.
    loadList(): Promise<ProjectRecieve[]>{
        let requestUrl = this.projectUrl + '/all';
        let headers = new Headers;
        this.headersService.createAuthHeaders(headers);
        return this.http
        .get(requestUrl, {headers: headers})
        .toPromise()
        .then(res => {
            var projects: ProjectRecieve[] = [];
            if(res.json().data){
                res.json().data.forEach(json => {
                    projects.push(this.convertProject(json));
                });
            }
            return projects;
        })
        .catch(this.handleError);
    }

    convertProject(object: Object): ProjectRecieve{
        var project :ProjectRecieve;
        project = new ProjectRecieve()

        var pDefault :ProjectDefault;
        pDefault = new ProjectDefault()

        pDefault.id = object['info']['id'];
        pDefault.name = object['info']['name'];
        pDefault.background = object['info']['background'];

        project.default = pDefault;
        project.client = object['info']['client'];

        project.tracked_time = object['tracked_time'];
        project.members = object['member'];

        return project;
    }
}
