import { Component, OnInit, OnChanges, SimpleChange }   from '@angular/core';
import { ProjectReportAdvance, ProjectDefault }         from '../models/project';
import { ActivatedRoute, Router }   from '@angular/router';
import { ReportService }            from './../services/report-service';
import { Category }                 from '../models/category';
import { Member }                   from '../models/member';
import { User }                     from '../models/user';
declare var $:any;

@Component({
    selector: 'app-report-details-advances',
    templateUrl: './report-details-advances.component.html',
    styleUrls: ['./report-details-advances.component.scss']
})
export class ReportDetailsAdvancesComponent implements OnInit {
    /** using show in calendar */
    options: string[][] =[['Yesterday', 'Last week', 'Last month', 'Last year'],
        ['Today', 'This week', 'This month', 'This year']];

    /** using show dropdown */
    labels = ["projects", "categories", "peoples"];

    /** constraint date for dropdown */
    projects: ProjectDefault[];
    peoples: Member[];
    categories: Category[];

    /** constraint date for dropdown selected */
    projects_selected: ProjectDefault[];
    peoples_selected: Member[];
    categories_selected: Category[];

    /** time selected in calendar */
    time_selected = "This week";

    /** list projects haven't archived follow time in calendar */
    _projects: ProjectReportAdvance[];

    /** time selected */
    start_date: Date;
    end_date: Date;

    /** using limit calendar day's choice */
    today = new Date();
    wakeup_children_input: number = 0;

    constructor(private reportService: ReportService) { }

    ngOnInit() {
        this.initVariableValue();
        this.reportService.getReportAdvances().then(
            (result) => {
                console.log("report advances", result);
                this._projects = result['projects'];
                this.categories = result['categories']
                this.peoples = result['company_members']
                this.initProjects();
            },
            (error) => {
                console.log("report advances err", error);
            }
        )
    }

    initVariableValue(){
        this._projects = [];
        this.projects = [];
        this.peoples = [];
        this.projects_selected = [];
        this.peoples_selected = [];
        this.categories_selected = [];

        this.chooseRange(1, 1);
    }

    ////
    //@function initProjects
    //@desc init value for project_selected
    //@param showFilters = true -> show/ false -> show search-header
    //return void
    ////
    initProjects(){
        for (let project of this._projects){
            var item = new ProjectDefault();
            item.id = Number(project.id);
            item.name = project.name;

            this.projects.push(item);
        }
    }

    ////
    //@function changeFilters
    //@desc change to show filter
    //@param showFilters = true -> show/ false -> show search-header
    //return void
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

    ////
    //@function showDropDown
    //@desc showDropDown of projects/ category or people
    //@param id -> working on what label
    //return void
    ////
    showDropDown(id: number, show: boolean){
        show ? $('#dropdown-' + id).show() : $('#dropdown-' + id).hide();
    }

    ////
    //@function dataSelected
    //@desc get list data to show dropdown
    //@param label -> working on what label
    //return void
    ////
    dataSelected(label: string){
        var list = [];
        switch(label){
            case this.labels[0]: {
                return this.projects_selected;
            }
            case this.labels[1]: {
                return this.categories_selected;
            }
            case this.labels[2]: {
                return this.peoples_selected;
            }
        }
        return list;
    }

    ////
    //@function selected
    //@desc add element to list
    //@param label -> working on what label, id -> get what element
    //return void
    ////
    selected(label: string, id: number){
        switch(label){
            case this.labels[0]: {
                var project = this.projects.find(x => x.id == id);
                if(project){
                    this.projects_selected.push(project);
                    this.projects.splice(this.projects.findIndex(x => x.id == id), 1);
                }
                break;
            }
            case this.labels[1]: {
                var category = this.categories.find(x => x.id == id);
                if(category){
                    this.categories_selected.push(category);
                    this.categories.splice(this.categories.findIndex(x => x.id == id), 1);
                }
                break;
            }
            case this.labels[2]: {
                var member = this.peoples.find(x => x.id == id);
                if(member){
                    this.peoples_selected.push(member);
                    this.peoples.splice(this.peoples.findIndex(x => x.id == id), 1);
                }
            }
        }
        this.wakeup_children_input++;
    }

    ////
    //@function unselected
    //@desc remove element in list
    //@param label -> working on what label, id -> get what element
    //return void
    ////
    unselected(label: string, id: number){
        switch(label){
            case this.labels[0]: {
                var project = this.projects_selected.find(x => x.id == id);
                if(project){
                    this.projects.push(project);
                    this.projects_selected.splice(this.projects_selected.findIndex(x => x.id == id), 1);
                }
                break;
            }
            case this.labels[1]: {
                var category = this.categories_selected.find(x => x.id == id);
                if(category){
                    this.categories.push(category);
                    this.categories_selected.splice(this.categories_selected.findIndex(x => x.id == id), 1);
                }
                break;
            }
            case this.labels[2]: {
                var member = this.peoples_selected.find(x => x.id == id);
                if(member){
                    this.peoples.push(member);
                    this.peoples_selected.splice(this.peoples_selected.findIndex(x => x.id == id), 1);
                }
            }
        }
        this.wakeup_children_input--;
    }

    ////
    //@function selectDate
    //@desc set date to show to date choice's field
    //@param i = 0 -> event of start_date, i = 1 -> event of start_date,i = 0 -> value of end_date
    //return void
    ////
    selectDate(i, event) {
        (i == 0)? this.start_date = new Date(event) : this.end_date = new Date(event);
        this.time_selected = this.dateToShortString(this.start_date) + ' --> ' + this.dateToShortString(this.end_date);
    }

    ////
    //@function chooseRange
    //@desc set date to show to date choice's field, content get from this.options
    //@param row - col in this.options
    //return void
    ////
    chooseRange(row, col) {
        let res = 4 * row + col;
        console.log(res);
        switch (res) {
            case 0: {
                this.yesterday();
                break;
            }
            case 1: {
                this.lastWeek();
                break;
            }
            case 2: {
                this.lastMonth();
                break;
            }
            case 3: {
                this.lastYear();
                break;
            }
            case 4: {
                this.toDay();
                break;
            }
            case 5: {
                this.thisWeek();
                break;
            }
            case 6: {
                this.thisMonth();
                break;
            }
            case 7: {
                this.thisYear();
                break;
            }
        }
        if(this.end_date > this.today) this.end_date = this.today;
        this.time_selected = this.options[row][col];
        this.showCalendar(false);
    }

    ////
    //@function showCalendar
    //@desc show calendar when click to date-choice's fiels
    //@param row - col in this.options
    //return void
    ////
    showCalendar(show :boolean){
        show? $('.choose-time').show() : $('.choose-time').hide();
    }

    ////
    //@function getListDropdown
    //@desc return list content for dropdown of project/categories/person
    //@param name -> working on what label
    //return void
    ////
    getListDropdown(name: string): any{
        var list = [];
        switch(name){
            case this.labels[0]:{
                return this.projects;
            };
            case this.labels[1]:{
                return this.categories;
            };
            case this.labels[2]: {
                return this.peoples;
            };
        }
        return list;
    }

    toDay(){
        this.start_date = new Date();
        this.end_date = new Date();
        // console.log('today', this.start_date, ' -> ', this.end_date);
    }

    yesterday(){
        this.toDay();
        this.start_date.setDate(this.start_date.getDate() - 1);
        this.end_date = this.start_date;
        // console.log('yesterday', this.start_date, ' -> ', this.end_date);
    }

    thisWeek(){
        this.toDay();
        this.start_date.setDate(this.start_date.getDate() - this.start_date.getDay());
        this.end_date.setDate(this.start_date.getDate() + 6);
        // console.log('date this-week', this.start_date, '->', this.end_date);
    }

    lastWeek(){
        this.thisWeek();
        this.start_date.setDate(this.start_date.getDate() - 7);
        this.end_date.setDate(this.start_date.getDate() + 6);
        // console.log('date last-week', this.start_date, '->', this.end_date);
    }

    thisMonth(){
        this.toDay();
        this.start_date.setDate(1);
        this.end_date.setMonth(this.start_date.getMonth() + 1);
        this.end_date.setDate(0);
        // console.log('this-month', this.start_date, '->', this.end_date);
    }

    lastMonth(){
        this.toDay();
        this.start_date.setMonth(this.start_date.getMonth() - 1);
        this.start_date.setDate(1);
        this.end_date.setDate(0);
        // console.log('last-month', this.start_date, '->', this.end_date);
    }

    thisYear(){
        var this_year = new Date(new Date().getFullYear(), 0, 1);
        this.start_date = this_year;
        this.end_date = new Date();
        // console.log('this year', this.start_date, '->', this.end_date);
    }

    lastYear(){
        var last_year = new Date(new Date().getFullYear() - 1, 0, 1);
        this.start_date = last_year;
        var this_year = new Date(new Date().getFullYear(), 0, 1);
        this_year.setDate(0);
        this.end_date = this_year;
        // console.log('this year', this.start_date, '->', this.end_date);
    }

    ////
    //@function dateToShortString
    //@desc convwert date to string format dd/MM/y
    //@param name -> working on what label
    //return void
    ////
    dateToShortString(date: Date): string {
        let yearString = date.getFullYear().toString();
        let monthString = ((date.getMonth() + 1) < 10) ? '0' + (date.getMonth() + 1).toString() : (date.getMonth() + 1).toString();
        let dateString = (date.getDate() < 10) ? '0' + date.getDate().toString() : date.getDate().toString();
        let res = dateString + '-' + monthString + '-' + yearString;
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
