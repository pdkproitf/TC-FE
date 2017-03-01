import { Component, OnInit } from '@angular/core';
import { Project } from '../models/project';
import { ProjectGetAll }  from '../models/project';
import { ProjectService } from './../services/project-service';

@Component({
    selector: 'app-project-list',
    templateUrl: './project-list.component.html',
    styleUrls: ['./project-list.component.scss'],
})
export class ProjectListComponent implements OnInit {
    project_lists: ProjectGetAll[]= [];
    constructor(private projectService: ProjectService) { }

    ngOnInit() {
        this.projectService.getProjects().then(
            (result) => {
                this.project_lists = result;
                console.log('result',result);
            },
            (error) => {
                alert(error);
                console.log('error',error);
            }
        );
    }
}
