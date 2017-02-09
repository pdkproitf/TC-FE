import { Component, OnInit, Input } from '@angular/core';
import { Project }  from '../models/project';
import { Router, Params }   from '@angular/router';
import {ActivatedRoute} from '@angular/router';
@Component({
    selector: 'app-project-details',
    templateUrl: './project-details.component.html',
    styleUrls: ['./project-details.component.scss']
})
export class ProjectDetailsComponent implements OnInit {
    project: Project = ({
        name: 'Temp Project',
        tasks: ['Task1', 'Task2', 'Task3', 'Task 4', 'Task 5'],
        client_id: 1,
        report_permission: 2,
        background: '#1abc9c',
    });
    constructor(private route: ActivatedRoute) {
        console.log(route.snapshot.params['id']);
        console.log('project', this.project);
    }

    ngOnInit() {
    }

    // go to in here after click to SAVE button
    save(project: Project){
        console.log('save');
    }
    // go to in here after click to DELETE button
    delete(project: Project){
        console.log('delete');
    }
    // go to in here after click to EDIT button
    edit(project: Project){
        console.log('edit');
    }
}
