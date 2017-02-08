import { Component, OnInit, Input } from '@angular/core';
import { Project }  from '../models/project';
import { Router }   from '@angular/router';
declare var $:any;

@Component({
    selector: 'app-table',
    templateUrl: './table.component.html',
    styleUrls: ['./table.component.scss']
})
export class TableComponent implements OnInit {
    isSortDown: boolean = true;
    @Input() projects: Project[];
    constructor(private router: Router) { }

    ngOnInit() {
        this.projects.sort(function(a, b){
            if(a.name < b.name) return -1;
            if(a.name > b.name) return 1;
            return 0;
        });
    }
    sortProject(){
        console.log();
        if(this.isSortDown){
            $('#sort-project').removeClass('fa fa-angle-down').addClass('fa fa-angle-up');
            this.isSortDown = false;
        }else{
            $('#sort-project').removeClass('fa fa-angle-up').addClass('fa fa-angle-down');
            this.isSortDown = true;
        }
        this.projects.reverse();
    }

    projectDetails(project: Project) {
        this.router.navigate(['#']);
    }
}
