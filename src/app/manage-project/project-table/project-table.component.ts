import { Component, OnInit, Input, OnChanges, SimpleChange } from '@angular/core';
import { AutoCompleteModule }   from 'primeng/primeng';
import { ProjectService }       from '../../services/project-service';
import { ProjectGetAll }        from '../../models/project';
import { Router }               from '@angular/router';
import { Project } from '../../models/project';
declare var $:any;

@Component({
    selector: 'app-project-table',
    templateUrl: './project-table.component.html',
    styleUrls: ['./project-table.component.scss']
})
export class ProjecTableComponent implements OnInit, OnChanges {
    //flag sort down of day update
    isSortDown: boolean = true;

    /** paginate */
    rowOfPage: number = 6;
    pages: Number[] = [];
    current_page: number = 1;

    searchPattern = '';

    /** pure projects  */
    projects: ProjectGetAll[] = [];
    /** project using show */
    _projects: ProjectGetAll[] = [];

    constructor(private router: Router, private projectService: ProjectService) {}

    ngOnInit() {
        this.initProjects();
    }

    ngOnChanges(changes: {[propKey: string]: SimpleChange}){
        if(changes['projects']) this.ngOnInit();
    }

    initProjects(){
        this.projectService.getProjects().then(
            (result) => {
                this.projects = result;
                this.sortNewest();
            },
            (error) => {
                alert(error);
                console.log('error',error);
            }
        );
    }

    ////
    //@function sortNewest
    //@desc sort projects DESC day updated
    //@param
    //@result
    ////
    sortNewest(){
        if(this.projects.length > 1){
            this.projects.sort(function(a, b){
                if(a.updated_at < b.updated_at) return 1;
                if(a.updated_at > b.updated_at) return -1;
                return 0;
            });
            var j = 1;
            for(var _i = 0; _i < this._projects.length; _i += this.rowOfPage){
                this.pages.push(j++);
            }
            this._projects = this.projects;
        }
    }

    ////
    //@function sortProject
    //@desc sort projects followupdated
    //@param
    //@result
    ////
    sortProject(){
        if(this.isSortDown){
            $('#sort-project').removeClass('fa fa-angle-down').addClass('fa fa-angle-up');
        }else{
            $('#sort-project').removeClass('fa fa-angle-up').addClass('fa fa-angle-down');
        }
        this.isSortDown = !this.isSortDown;
        this.projects.reverse();
    }

    search(event) {
        this._projects = [];
        for (let project of this.projects) {
            if ((project.name.toUpperCase().indexOf(this.searchPattern.toUpperCase()) > -1) ||
                (project.name.toLowerCase() .indexOf(this.searchPattern.toLowerCase()) > -1)) {
                this._projects.push(project);
            }
        }
        this.current_page = 1;
    }

    onFocus() {
        $('search-group').css({'background': '#ddd'})
    }

    // link to peoject detail page
    projectDetails(project: ProjectGetAll) {
        this.router.navigate(['/projects', project.id]);
    }

    // show or hide project control each row
    showProjectControl(isShow: boolean, name: String){
        isShow?  $('#project-control-'+name).show():$('#project-control-'+name).hide();
    }

    // go to in here after click to SAVE button
    save(project: ProjectGetAll){

    }
    // go to in here after click to DELETE button
    delete(project: ProjectGetAll){

    }
    // go to in here after click to EDIT button
    edit(project: ProjectGetAll){
        this.router.navigate(['/edit-project/'+project.id])
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
}
