import { Component, OnInit } from '@angular/core';
import { Project } from '../models/project';

@Component({
    selector: 'app-project-list',
    templateUrl: './project-list.component.html',
    styleUrls: ['./project-list.component.scss'],
})
export class ProjectListComponent implements OnInit {
    project_lists: Project[]= [
        {
            name: 'Temp Project',
            tasks: ['Task1', 'Task2', 'Task3', 'Task 4', 'Task 5'],
            client_id: 1,
            report_permission: 2,
            background: '#1abc9c',
        },
        {
            name: 'Temp Project 1',
            tasks: ['Task1', 'Task2', 'Task3'],
            client_id: 1,
            report_permission: 2,
            background: '#2ecc71',
        },
        {
            name: 'Temp Project 2',
            tasks: ['Task1', 'Task2', 'Task3'],
            client_id: 1,
            report_permission: 2,
            background: '#3498db',
        },
        {
            name: 'Temp Project 3',
            tasks: ['Task1', 'Task2', 'Task3'],
            client_id: 1,
            report_permission: 2,
            background: '#f1c40f',
        },
        {
            name: 'Temp Project 4',
            tasks: ['Task1', 'Task2', 'Task3'],
            client_id: 1,
            report_permission: 2,
            background: '#d35400',
        },
        {
            name: 'Temp Project 5',
            tasks: ['Task1', 'Task2', 'Task3'],
            client_id: 1,
            report_permission: 2,
            background: '#e74c3c',
        }
    ];
    constructor() { }

    ngOnInit() {
    }
}
