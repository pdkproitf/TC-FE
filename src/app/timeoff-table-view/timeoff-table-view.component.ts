import { Component, OnInit } from '@angular/core';

@Component({
    selector: 'app-timeoff-table-view',
    templateUrl: './timeoff-table-view.component.html',
    styleUrls: ['./timeoff-table-view.component.scss']
})
export class TimeoffTableViewComponent implements OnInit {

    days = [];
    selectedValues: string[] = [];

    constructor() {
        for(var i = 0; i < 15; i++){
            this.days.push(i);
        }
    }

    ngOnInit() {
    }

    showCheck(){
        console.log('checked', this.selectedValues);
    }
}
