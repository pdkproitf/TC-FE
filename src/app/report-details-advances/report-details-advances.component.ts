import { Component, OnInit } from '@angular/core';
declare var $:any;

@Component({
    selector: 'app-report-details-advances',
    templateUrl: './report-details-advances.component.html',
    styleUrls: ['./report-details-advances.component.scss']
})
export class ReportDetailsAdvancesComponent implements OnInit {
    options: string[][] = [['Last week', 'Last month'], ['This week', 'This month']];
    labels = ["projects", "categories", "peoples"];

    projects = ["project 1", "project 2", "project 3"];
    categories = ["category 1", "category 2", "category 3"];
    peoples = ["people 1", "people 2", "people 3"];

    time_selected = "This week";

    constructor() { }

    ngOnInit() {
        // $('body').css({"background": "#F3F5F8"});
    }

    ////
    // @function changeFilters
    // @desc change to show filter
    //
    ////
    changeFilters(showFilters: boolean){
        if(showFilters){
            $('.search-header').hide();
            $('.search-filters').show();
            $('.button-filter').hide();
        }else{
            $('.search-header').show();
            $('.search-filters').hide();
            $('.button-filter').show();;
        }
    }

    showDropDown(id: number, show: boolean){
        show ? $('#dropdown-' + id).show() : $('#dropdown-' + id).hide();
    }

    selected(){
        console.log('select');
    }

    selectDate(i, event) {
        console.log('i', i, 'event', event)
        this.time_selected = this.dateToShortString(new Date(event));
        $('.choose-time').hide();
    }

    showCalendar(show :boolean){
        console.log('show calen dar');
        show? $('.choose-time').show() : $('.choose-time').hide();
    }

    getListDropdown(name: string){
        switch(name){
            case this.labels[0]:{
                return this.projects;
            }
            case this.labels[1]:{
                return this.categories;
            }
            default:{
                return this.peoples;
            }
        }
    }

    dateToShortString(date: Date): string {
        let yearString = date.getFullYear().toString();
        let monthString = ((date.getMonth() + 1) < 10) ? '0' + (date.getMonth() + 1).toString() : (date.getMonth() + 1).toString();
        let dateString = (date.getDate() < 10) ? '0' + date.getDate().toString() : date.getDate().toString();
        let res = yearString + '-' + monthString + '-' + dateString;
        return res;
    }

    runReport(){
        console.log('run report');
        this.changeFilters(false);
    }

    cancel(){
        this.changeFilters(false);
        console.log('cancel');
    }
}
