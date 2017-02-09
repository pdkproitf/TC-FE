import { Component, OnInit } from '@angular/core';
import { Project } from '../models/project';
import { ProjectRecieve }  from '../models/project';
import { ProjectService } from './../services/project-service';

@Component({
    selector: 'app-project-list',
    templateUrl: './project-list.component.html',
    styleUrls: ['./project-list.component.scss'],
})
export class ProjectListComponent implements OnInit {
    project_lists: ProjectRecieve[]= [];
    constructor(private projectService: ProjectService) { }

    ngOnInit() {
        this.projectService.loadList().then(result => this.project_lists = result);
    }
}
