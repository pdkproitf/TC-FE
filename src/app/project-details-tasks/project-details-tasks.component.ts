import { Component, OnInit, Input } from '@angular/core';
import { ProjectRecieve }   from '../models/project';
declare var $:any;

@Component({
    selector: 'app-project-details-tasks',
    templateUrl: './project-details-tasks.component.html',
    styleUrls: ['./project-details-tasks.component.scss']
})
export class ProjectDetailsTasksComponent implements OnInit {
    is_show_task_user_details: boolean = false;

    @Input() project: ProjectRecieve[];
    constructor() { }

    ngOnInit() {
    }

    tasks_user_details(){
        if(!this.is_show_task_user_details){
            $('.fa-plus').removeClass('fa-plus').addClass('fa-minus');
            $('.project-user').css({'float': 'none'});
            $('.user-name').css({'display': 'block'})
        }else{
            $('.fa-minus').removeClass('fa-minus').addClass('fa-plus');
            $('.project-user').css({'float': 'left'});
            $('.user-name').css({'display': 'none'})
        }
        this.is_show_task_user_details = !this.is_show_task_user_details;
    }
}
