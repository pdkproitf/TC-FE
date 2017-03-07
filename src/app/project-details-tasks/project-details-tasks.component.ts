import { Component, OnInit, Input , OnChanges, SimpleChange } from '@angular/core';
import { ProjectGetOne }   from '../models/project';
declare var $:any;

@Component({
    selector: 'app-project-details-tasks',
    templateUrl: './project-details-tasks.component.html',
    styleUrls: ['./project-details-tasks.component.scss']
})
export class ProjectDetailsTasksComponent implements OnInit, OnChanges {
    is_show_project_categoy_details: Map<Number, boolean> = new Map<Number, boolean>();
    num_of_user_show: Map<Number, Number> = new Map<Number, Number>();

    @Input() project: ProjectGetOne;
    constructor() { }

    ngOnInit() {
        if(this.project){
            this.is_show_project_categoy_details= new Map<Number, boolean>();
            this.num_of_user_show= new Map<Number, Number>();
            this.project.categories.forEach(res => {
                this.is_show_project_categoy_details.set(res.id, false);
                this.num_of_user_show.set(res.id, 5);
            })
        }
    }

    ngOnChanges(changes: {[propKey: string]: SimpleChange}){
        if(changes['project']) this.ngOnInit();
    }

    tasks_user_details(id: Number){
        var flag = this.is_show_project_categoy_details.get(id);
        if(flag){
            this.num_of_user_show.set(id, 5);
            $('#task-row-'+id).find('.fa-minus').removeClass('fa-minus').addClass('fa-plus');
            $('#task-row-'+id).find('.project-user').css({'float': 'left'});

            $('#task-row-'+id).find('.user-name').css({'display': 'none'})
            $('#task-row-'+id).find('.member-tracker').css({'display': 'none'})
        }else{
            this.num_of_user_show.set(id, this.project.members.length);
            $('#task-row-'+id).find('.fa-plus').removeClass('fa-plus').addClass('fa-minus');
            $('#task-row-'+id).find('.project-user').css({'float': 'none'});

            $('#task-row-'+id).find('.user-name').css({'display': 'block'})
            $('#task-row-'+id).find('.member-tracker').css({'display': 'block'})
        }
        this.is_show_project_categoy_details.set(id, !flag);
    }
}
