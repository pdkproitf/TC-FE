import { Component, OnInit }    from '@angular/core';

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

    constructor() {}

    ngOnInit() {
        this.end_date =  new Date();
        this.end_date.setDate(this.start_date.getDate() + 14);
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
}
