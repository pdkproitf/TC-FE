import { Component, OnInit, Input } from '@angular/core';
import { ProjectRecieve }  from '../models/project';
import { Router }   from '@angular/router';
declare var $:any;

@Component({
    selector: 'app-table',
    templateUrl: './table.component.html',
    styleUrls: ['./table.component.scss']
})
export class TableComponent implements OnInit {
    isSortDown: boolean = true;
    project_id: number = 1;
    @Input() projects: ProjectRecieve[];
    constructor(private router: Router) { }

    ngOnInit() {
        this.projects.sort(function(a, b){
            if(a.default.name < b.default.name) return -1;
            if(a.default.name > b.default.name) return 1;
            return 0;
        });
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
}
