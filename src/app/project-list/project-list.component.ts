import { Component, OnInit } from '@angular/core';
import { Project } from '../models/project';

@Component({
    selector: 'app-project-list',
    templateUrl: './project-list.component.html',
    styleUrls: ['./project-list.component.scss'],
})
export class ProjectListComponent implements OnInit {
    project_lists: Project[]= [];
    constructor() { }

    ngOnInit() {
    }
}
