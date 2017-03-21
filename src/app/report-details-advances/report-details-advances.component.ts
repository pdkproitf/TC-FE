import { Component, OnInit } from '@angular/core';
declare var $:any;

@Component({
    selector: 'app-report-details-advances',
    templateUrl: './report-details-advances.component.html',
    styleUrls: ['./report-details-advances.component.scss']
})
export class ReportDetailsAdvancesComponent implements OnInit {

    constructor() { }

    ngOnInit() {
        // $('body').css({"background": "#F3F5F8"});
    }
    ////
    // @function changeFilters
    // @desc change to show filter
    //
    ////
    changeFilters(){
        $('.search-header').hide();
        $('.search-filters').show();
    }

}
