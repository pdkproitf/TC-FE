import { Component, OnInit, Input } from '@angular/core';
import { ProjectRecieve }   from '../models/project';
import { Router, Params }   from '@angular/router';
import { ActivatedRoute }   from '@angular/router';
import { ProjectService }   from '../services/project-service';

@Component({
    selector: 'app-project-details',
    templateUrl: './project-details.component.html',
    styleUrls: ['./project-details.component.scss']
})
export class ProjectDetailsComponent implements OnInit {
    project: ProjectRecieve;
    // project: Project = ({
    //     name: 'Temp Project',
    //     tasks: ['Task1', 'Task2', 'Task3', 'Task 4', 'Task 5'],
    //     client_id: 1,
    //     report_permission: 2,
    //     background: '#1abc9c',
    // });
    constructor(private route: ActivatedRoute, private projectService: ProjectService) {
        projectService.getProject(route.snapshot.params['id']);
    }

    ngOnInit() {
    }

    // go to in here after click to SAVE button
    save(project: ProjectRecieve){
        console.log('save');
    }
    // go to in here after click to DELETE button
    delete(project: ProjectRecieve){
        console.log('delete');
    }
    // go to in here after click to EDIT button
    edit(project: ProjectRecieve){
        console.log('edit');
    }
}
