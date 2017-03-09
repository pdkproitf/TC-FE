import { Component, OnInit } from '@angular/core';

@Component({
    selector: 'app-timeoff-calendar',
    templateUrl: './timeoff-calendar.component.html',
    styleUrls: ['./timeoff-calendar.component.scss']
})
export class TimeoffCalendarComponent implements OnInit {
    projects = ['project 1', 'project 2', 'project 3'];
    select_project = '';

    start_date: Date = new Date();
    end_date: Date;

    constructor() { }

    ngOnInit() {
        this.end_date =  new Date();
        this.end_date.setDate(this.start_date.getDate() + 14);
    }

    setWeeks($event){
        console.log('event',$event);
        this.start_date = $event;
        this.updateEndDay();
    }

    previousWeek(){
        this.start_date =  new Date(this.start_date.toString());
        this.start_date.setDate(this.start_date.getDate() - 14);
        this.updateEndDay();
    }

    nextWeek(){
        this.start_date =  new Date(this.start_date.toString());
        this.start_date.setDate(this.start_date.getDate() + 14);
        this.updateEndDay();
    }

    updateEndDay(){
        this.end_date =  new Date(this.start_date.toString());
        this.end_date.setDate(this.start_date.getDate() + 14);
    }
}
