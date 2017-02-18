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
export class ProjectService {
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

    //get project under user role with param id.
    getProject(id: String): Promise<ProjectGetOne>{
        let requestUrl = this.projectUrl + '/'+ id;
        let headers = new Headers;
        this.headersService.createAuthHeaders(headers);
        return this.http
        .get(requestUrl, {headers: headers})
        .toPromise()
        .then(res => {
            console.log('get project '+id, res.json());
            return this.convertProjectGetOne(res.json());
        })
        .catch(this.handleError);
    }

    // load all projects under user role.
    getProjects(): Promise<ProjectGetAll[]>{
        let requestUrl = this.projectUrl + '';
        let headers = new Headers;
        this.headersService.createAuthHeaders(headers);
        return this.http
        .get(requestUrl, {headers: headers})
        .toPromise()
        .then(res => {
            var projects: ProjectGetAll[] = [];
            if(res.json().data){
                res.json().data.forEach(json => {
                    projects.push(this.convertProjectReceive(json));
                });
            }
            console.log('get project ', res.json());
            return projects;
        })
        .catch(this.handleError);
    }

    convertProjectReceive(object: Object): ProjectGetAll{
        var project :ProjectGetAll;
        project = new ProjectGetAll()

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

    convertProjectGetOne(object: Object): ProjectGetOne{
        var project: ProjectGetOne = new ProjectGetOne();
        if(object['data']){
            var data = object['data'];
            if(data['info']){
                var pDefault :ProjectDefault;
                pDefault = new ProjectDefault()

                pDefault.id = data['info']['id'];
                pDefault.background = data['info']['background'];
                pDefault.name = data['info']['name'];

                var client: Client = new Client();
                client.name = data['info']['client_name'];

                project.tracked_time = data['info']['tracked_time'];

                project.default = pDefault;
                project.client = client;
            }
            if(data['project_category']){
                var projectCategory: ProjectCategory[] = [];

                if(data['project_category']){

                    data['project_category'].forEach(data => {
                        var project_category =  new ProjectCategory();
                        // category
                        var category: Category = new Category();
                        if(data['category']){
                            category.id = data['category']['id'];
                            category.name = data['category']['name'];
                        }
                        project_category.category = category;

                        // member list
                        var memberList: ProjectCategoryMember[] = [];
                        var members = data['member']
                        if(members){
                            members.forEach(member => {
                                var projectCategoryMember: ProjectCategoryMember = new ProjectCategoryMember();
                                projectCategoryMember.user = member['user'];
                                projectCategoryMember.roles = member['role'];
                                projectCategoryMember.tracked_time = member['tracked_time'];
                                memberList.push(projectCategoryMember);
                            })
                        }
                        project_category.memberList = memberList;

                        project_category.id = data['id'];
                        project_category.tracked_time = data['tracked_time']

                        projectCategory.push(project_category);
                    });
                }
                project.project_category = projectCategory;
            }
        }
        return project;
    }

    convertSecondToTime(times: String): String{
        var seconds = Number(times);
        return Math.floor(seconds/(60*60)) + ":" +  Math.floor((seconds % (60*60))/(60));
    }
}
