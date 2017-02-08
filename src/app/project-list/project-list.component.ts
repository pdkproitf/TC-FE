import { Component, OnInit } from '@angular/core';
import { Project } from '../models/project';

@Component({
    selector: 'app-project-list',
    templateUrl: './project-list.component.html',
    styleUrls: ['./project-list.component.scss'],
})
export class ProjectListComponent implements OnInit {
    project_lists: Project[]=[
        {
            color: '#1abc9c',
            name: 'Admin',
            tasks: ['Task1', 'Task2', 'Task3', 'Task 4', 'Task 5', 'Task 6'],
            company: 'CES',
        },
        {
            color: '#2ecc71',
            name: 'Framer',
            tasks: ['Task1', 'Task2', 'Task3'],
            company: 'picture Plush',
        },
        {
            color: '#3498db',
            name: 'Flo Capital',
            tasks: ['Task1', 'Task2', 'Task3'],
            company: 'Russ',
        },
        {
            color: '#f1c40f',
            name: 'Logic Tech',
            tasks: ['Task1', 'Task2', 'Task3'],
            company: 'Adam',
        },
        {
            color: '#d35400',
            name: 'Training',
            tasks: ['Task1', 'Task2', 'Task3'],
            company: 'CES',
        },
        {
            color: '#e74c3c',
            name: 'Virtuo',
            tasks: ['Task1', 'Task2', 'Task3'],
            company: 'Zilly',
        }
    ]
    constructor() { }

    ngOnInit() {
    }
}
