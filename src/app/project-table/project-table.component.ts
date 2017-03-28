import { Component, OnInit, Input, OnChanges, SimpleChange } from '@angular/core';
import { AutoCompleteModule }   from 'primeng/primeng';
import { ProjectGetAll }        from '../models/project';
import { Router }               from '@angular/router';
declare var $:any;

@Component({
    selector: 'app-project-table',
    templateUrl: './project-table.component.html',
    styleUrls: ['./project-table.component.scss']
})
export class ProjecTableComponent implements OnInit, OnChanges {
    isSortDown: boolean = true;
    project_id: number = 1;
    current_page: number = 1;
    rowOfPage: number = 6;
    pages: Number[] = [];
    classImageSearch = 'fa fa-search imgspan';
    searchPattern = '';
    _projects: ProjectGetAll[] = [];

    @Input() projects: ProjectGetAll[];

    constructor(private router: Router) { }

    ngOnInit() {
        if(this.projects.length > 1){
            this.projects.sort(function(a, b){
                if(a.name < b.name) return -1;
                if(a.name > b.name) return 1;
                return 0;
            });
            var j = 1;
            for(var _i = 0; _i < this._projects.length; _i+=this.rowOfPage){
                this.pages.push(j++);
            }
            if(this.projects.length > this.rowOfPage) this.changeIconPaginate();
        }
        this._projects = this.projects;
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

    search(event) {
        this._projects = [];
        for (let project of this.projects) {
            if ((project.name.toUpperCase().indexOf(this.searchPattern.toUpperCase()) > -1) ||
                (project.name.toLowerCase() .indexOf(this.searchPattern.toLowerCase()) > -1)) {
                this._projects.push(project);
            }
        }
    }

    onBlur() {
        if (this.searchPattern === '') {
            this.classImageSearch = 'fa fa-search imgspan';
        }
    }

    onFocus() {
        this.classImageSearch = 'fa fa-search imghidden';
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

    // change forward anjd backforward icon
    changeIconPaginate(){
        $('#projects-paginate').css({'display': 'block'});
        $('.fa-forward').addClass('fa fa-angle-right');
        $('.fa-backward').addClass('fa fa-angle-left');
        $('.fa-step-forward').addClass('fa fa-angle-double-right fa-1');
        $('.fa-step-backward').addClass('fa fa-angle-double-left fa-1');
    }
}
