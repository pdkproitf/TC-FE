import { Component, OnInit, EventEmitter, Output }        from '@angular/core';
import { Project, ProjectDefault }  from '../../models/project';
import { Job }                      from '../../models/job';

@Component({
    selector: 'app-timeoff-calendar',
    templateUrl: './timeoff-calendar.component.html',
    styleUrls: ['./timeoff-calendar.component.scss']
})
export class TimeoffCalendarComponent implements OnInit {
    projects: Array<ProjectDefault>;
    select_project = '0';

    jobs: Array<Job>;
    select_job = '0';

    start_date: Date = new Date();
    end_date: Date;

    @Output() reload = new EventEmitter();

    constructor() {}

    ngOnInit() {
        this.end_date =  new Date();
        this.end_date.setDate(this.start_date.getDate() + 14);
        this.projects = new Array<ProjectDefault>();
    }

    setWeeks($event){
        this.start_date = $event;
        this.updateEndDate();
    }

    addWeeks(add: boolean){
        this.start_date =  new Date(this.start_date.toString());
        add? this.start_date.setDate(this.start_date.getDate() + 14) : this.start_date.setDate(this.start_date.getDate() - 14);
        this.updateEndDate();
    }

    setToDay(){
        this.start_date = new Date();
        this.updateEndDate();
    }

    updateEndDate(){
        this.end_date =  new Date(this.start_date.toString());
        this.end_date.setDate(this.start_date.getDate() + 14);
    }

    setProjectsValues(list: ProjectDefault[]){
        this.projects = list;
    }

    setJobsValues(list: Job[]){
        this.jobs = list;
    }

    reloadEmit(){
        this.reload.emit();
    }
}
