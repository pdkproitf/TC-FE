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

    @Input() project: ProjectGetOne;
    constructor() { }

    ngOnInit() {
        if(this.project){
            console.log('task project', this.project);
            this.is_show_project_categoy_details= new Map<Number, boolean>();
            this.project.project_category.forEach(res => {
                this.is_show_project_categoy_details.set(res.id, false);
            })
        }
    }

    ngOnChanges(changes: {[propKey: string]: SimpleChange}){
        if(changes['project']) this.ngOnInit();
    }

    tasks_user_details(id: Number){
        var flag = this.is_show_project_categoy_details.get(id);
        if(flag){
            $('#task-row-'+id).find('.fa-minus').removeClass('fa-minus').addClass('fa-plus');
            $('#task-row-'+id).find('.project-user').css({'float': 'left'});
            $('#task-row-'+id).find('.user-name').css({'display': 'none'})
        }else{
            $('#task-row-'+id).find('.fa-plus').removeClass('fa-plus').addClass('fa-minus');
            $('#task-row-'+id).find('.project-user').css({'float': 'none'});
            $('#task-row-'+id).find('.user-name').css({'display': 'block'})
        }
        this.is_show_project_categoy_details.set(id, !flag);
    }
}
