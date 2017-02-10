import { ProjectRecieve }  from '../models/project';
import { Component, OnInit, Input, OnChanges, SimpleChange } from '@angular/core';
import { Router }           from '@angular/router';
declare var $:any;

@Component({
    selector: 'app-table',
    templateUrl: './table.component.html',
    styleUrls: ['./table.component.scss']
})
export class TableComponent implements OnInit, OnChanges {
    isSortDown: boolean = true;
    project_id: number = 1;
    current_page: number = 1;
    rowOfPage: number = 6;
    pages: Number[] = [];

    @Input() projects: ProjectRecieve[];
    constructor(private router: Router) { }
    ngOnInit() {
        if(this.projects.length > 1){
            this.projects.sort(function(a, b){
                if(a.default.name < b.default.name) return -1;
                if(a.default.name > b.default.name) return 1;
                return 0;
            });
            var j = 1;
            for(var _i = 0; _i < this.projects.length; _i+=this.rowOfPage){
                this.pages.push(j++);
            }
        }
        this.changeIconPaginate();
    }

    ngOnChanges(changes: {[propKey: string]: SimpleChange}){
        if(changes['projects']) this.ngOnInit();
    }

    // sort project by project name follow alpha.
    sortProject(){
        if(this.isSortDown){
            $('#sort-project').removeClass('fa fa-angle-down').addClass('fa fa-angle-up');
        }else{
            $('#sort-project').removeClass('fa fa-angle-up').addClass('fa fa-angle-down');
        }
        this.isSortDown = !this.isSortDown;
        this.projects.reverse();
    }

    // link to peoject detail page
    projectDetails(project: ProjectRecieve) {
        // this.router.navigate(['#']);
    }

    // show or hide project control each row
    showProjectControl(isShow: boolean, name: String){
        if(isShow)  $('#project-control-'+name).show();
        else        $('#project-control-'+name).hide();
    }

    // go to in here after click to SAVE button
    save(project: ProjectRecieve){

    }
    // go to in here after click to DELETE button
    delete(project: ProjectRecieve){

    }
    // go to in here after click to EDIT button
    edit(project: ProjectRecieve){

    }

    // update current_page each time click page_button
    paginates(event) {
        this.current_page = event.page + 1;
        // this.changeIconPaginate();
        //event.first = Index of the first record
        //event.rows = Number of rows to display in new page
        //event.page = Index of the new page
        //event.pageCount = Total number of pages
    }

    // change forward anjd backforward icon
    changeIconPaginate(){
        $('.fa-forward').addClass('fa fa-angle-right');
        $('.fa-backward').addClass('fa fa-angle-left');
        $('.fa-step-forward').addClass('fa fa-angle-double-right fa-1');
        $('.fa-step-backward').addClass('fa fa-angle-double-left fa-1');
    }
}
