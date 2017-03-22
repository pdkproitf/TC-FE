import { Component, OnInit } from '@angular/core';

@Component({
    selector: 'app-report-details-advances-list',
    templateUrl: './report-details-advances-list.component.html',
    styleUrls: ['./report-details-advances-list.component.scss']
})
export class ReportDetailsAdvancesListComponent implements OnInit {
    categories = ["Category 1", "Category 2", "Category 3"]
    hours = ["hour 1", "hour 2", "hour 3"]

    constructor() { }

    ngOnInit() {
    }

}
