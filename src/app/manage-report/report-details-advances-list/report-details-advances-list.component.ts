import { Component, OnInit, Input, OnChanges, SimpleChange }     from '@angular/core';
import { ProjectReportAdvance, ProjectDefault }     from '../../models/project';
import { TimerAdvance }                 from '../../models/timer';
import { Category }                     from '../../models/category';
import { Member }                       from '../../models/member';
import { User }                         from '../../models/user';

@Component({
    selector: 'app-report-details-advances-list',
    templateUrl: './report-details-advances-list.component.html',
    styleUrls: ['./report-details-advances-list.component.scss']
})
export class ReportDetailsAdvancesListComponent implements OnInit, OnChanges {
    /** types of group by */
    group_by_types = ["Category", "Person", "Date"]
    group_by_selected: number = 0;
    /** types of show */
    show_types = ["Billables", "Unbillable"]
    show_selected = 0;

    /** time queryed */
    start_date: Date;
    end_date: Date;

    /** constraint data for dropdown selected */
    project_selected: ProjectDefault[];
    categories_selected: Category[];
    peoples_selected: Member[];
    days_selected: { id: number; name: Date}[];

    /** constraint parten in search - field */
    searchPattern = '';
    /** array people in search */
    searchList: number[] = [];

    /** list date follow current view types */
    view_selecteds = [];

    // data get from parent, list project basic
    _projects: ProjectReportAdvance[];
    // data using for show
    project_view: ProjectReportAdvance[];

    @Input()
    set projects(projects: ProjectReportAdvance[]){
        this._projects = projects;
        this.project_view = this._projects;
    }

    @Input()
    set projectsSelected(projects_selected: ProjectDefault[]){
        this.project_selected = projects_selected;
    }

    @Input()
    set categoriesSelected(categories_selected: Category[]){
        this.categories_selected = categories_selected;
    }

    @Input()
    set peoplesSelected(people_selected: Member[]){
        this.peoples_selected = people_selected;
    }

    @Input()
    set startDay(date: Date){
        date.setHours(0,0,0,0);
        this.start_date = date;
    }

    @Input()
    set endDay(date: Date){
        date.setHours(0,0,0,0);
        this.end_date = date;
    }

    constructor() {
        this.project_selected = [];
        this.peoples_selected = [];
        this.categories_selected = [];
    }

    ngOnInit() {
        this.view_selecteds = this.project_selected;
        this.initDaysValue();
        this.selectGroup();
    }

    ngOnChanges(changes: {[propKey: string]: SimpleChange}){
        console.log('change', changes);
        this.ngOnInit();
    }

    initDaysValue(){
        this.days_selected = [];
        var i = 1;
        for(var date = this.start_date; date <= this.end_date; date.setDate(date.getDate() + 1)){
            this.days_selected.push({id: i++, name: date});
            date = new Date(date);
        }
    }

    ////
    //@function selectGroup
    //@desc show list timers follow group change
    //@param
    //@result
    ////
    selectGroup(){
        let num = parseInt(this.group_by_selected + '', 10);

        switch(num){
            case 0:{ //project type
                this.view_selecteds = this.project_selected;
                break;
            }
            case 1:{ //category type
                this.view_selecteds = this.categories_selected;
                break;
            }
            case 2:{ //people type
                this.view_selecteds = this.peoples_selected;
                break;
            }
            case 3:{ //date type
                this.view_selecteds = this.days_selected;
                break;
            }
            default: {
                this.view_selecteds = [];
            }
        }
    }

    ////
    //@function selectShow
    //@desc select show type -> update data show for each project with show-type change
    //@param
    //@result
    ////
    selectShow(){
        this.selectGroup();
    }

    ////
    //@function search
    //@desc update data show for each project with people change
    //@param
    //@result
    ////
    search(){
        this.searchList = [];
        this.peoples_selected.forEach((member) =>{
            var name = member.user.first_name + ' '+ member.user.last_name;
            if ((name.toUpperCase().indexOf(this.searchPattern.toUpperCase()) > -1) ||
                (name.toLowerCase().indexOf(this.searchPattern.toLowerCase()) > -1))
                    this.searchList.push(member.id);
        })
        this.selectGroup();
    }

    ////
    //@function isConstraintItem
    //@desc check item_ in project
    //@param project_id: number, item_id: number
    //@result true/ if project constraint item
    ////
    isConstraintItem(project_id: number, item_id: number){
        let value = false;

        var project = this.getProject(project_id);
        if(!project) return false;
        let num = parseInt(this.group_by_selected + '', 10);
        switch(num){
            case 0:{ //item is project type
                // value = (project.id == item_id);
                if((project.id == item_id) && project.timers.length > 0)
                    value = true;
                break;
            }
            case 1:{ //item is category type
                value = this.projectConstraintCategory(project, item_id);
                break;
            }
            case 2:{ //item is people type
                value = project.timers.findIndex(x => x.category_member.member_id == item_id) != -1;
                break;
            }
            case 3:{ //item is date type
                value = this.projectConstraintTimerDate(project, item_id);
                break;
            }
        }
        return value;
    }

    ////
    //@function projectConstraintCategory
    //@desc check project constraint timer with category item_id
    //@param project, item_id -> to get category from category_selected
    //@result true/false
    ////
    projectConstraintCategory(project: ProjectReportAdvance, item_id: number){
        var value = false;
        var category = this.getCategory(item_id);
        var pro_category = project.categories.find(x => x.name == category.name);
        if(category){ // category in project
            var pro_category = project.categories.find(x => x.name == category.name);
            if(pro_category) // any timers in category or not. false if not
                value = project.timers.findIndex(x => x.category_member.category_id == pro_category.id) != -1;
        }
        return value;
    }

    ////
    //@function projectConstraintTimerDate
    //@desc check project constraint timer with date item_id
    //@param project, item_id -> to get Date from date_selected
    //@result true/false
    ////
    projectConstraintTimerDate(project: ProjectReportAdvance, item_id: number){
        var value = false;
        var day = this.days_selected.find(x => x.id == item_id);
        if(day){
            // console.log('day', day)
            for( let timer of project.timers){
                var date = this.convertDate(timer.start_time);
                if(date.getTime() == day.name.getTime())
                    return true;
            }
        }
        return value;
    }

    ////
    //@function itemTrackedTime
    //@desc get tracked_time of item in project
    //@param project_id -> id of project in this._projects, item_id -> condition
    //@result tracked_time of item_type in project
    ////
    itemTrackedTime(project_id: number, item_id: number){
        let tracked_time = 0;
        var project = this.getProject(project_id);
        if(!project) return 0;

        let num = parseInt(this.group_by_selected + '', 10);
        switch(num){
            case 0:{ //project type
                tracked_time = project.tracked_time;
                break;
            }
            case 1:{ //category type
                var pro_category = this.getCategoryInProject(project, item_id);
                if(pro_category)
                    tracked_time = pro_category.tracked_time;
                break;
            }
            case 2:{ //people type
                project.timers.forEach(timer => {
                    if(timer.category_member.member_id == item_id)
                        tracked_time += timer.tracked_time;
                })
                break;
            }
            case 3:{ //date type
                var day = this.days_selected.find(x => x.id == item_id);
                project.timers.forEach(timer => {
                    var date = this.convertDate(timer.start_time);
                    if(date.getTime() == day.name.getTime())
                        tracked_time += timer.tracked_time;
                })
                break;
            }
        }
        return tracked_time;
    }

    ////
    //@function timersShow
    //@desc get list timers able to show
    //@param project_id -> id of project in this._projects, item_id -> condition
    //@result list times pass item_type condition
    ////
    timersShow(project_id: number, item_id: number){
        let tracked_time = 0;
        let project = this.getProject(project_id);
        var timers_show: TimerAdvance[] = [];

        let num = parseInt(this.group_by_selected + '', 10);
        switch(num){
            case 0:{ //item is project type
                project.timers.forEach(timer => {
                    if(this.isShow(project, timer))
                        timers_show.push(timer);
                });
                break;
            }
            case 1:{ //item is category type
                /**  because the DB design category table comflex so you have to find the category in this.selectedCategory
                    end after that find category with the name have just found in project */
                var category = this.getCategory(item_id); if(!category) return
                var project_cate = this.getProjectCategory(category.name, project);
                project_cate && project.timers.forEach(timer => {
                    if((timer.category_member.category_id == project_cate.id) && this.isShow(project, timer))
                        timers_show.push(timer);
                })
                break;
            }
            case 2:{ //item is people type
                var member = project.members.find(x => x.id == item_id);
                project.timers.forEach(timer => {
                    if((timer.category_member.member_id == member.id) && this.isShow(project, timer))
                        timers_show.push(timer);
                })
                break;
            }
            case 3:{ //item is date type
                var day = this.days_selected.find(x => x.id == item_id);
                project.timers.forEach(timer => {
                    // console.log('timer', timer.category_member.tracked_time, 'tracked timer', tracked_time)
                    var date = this.convertDate(timer.start_time);
                    if((date.getTime() == day.name.getTime()) && this.isShow(project, timer))
                        timers_show.push(timer);
                })
                break;
            }
        }
        return timers_show;
    }

    convertDate(date: any): Date{
        date = new Date(date);
        date.setHours(0, 0, 0, 0);
        return date;
    }

    ////
    //@function isShow
    //@desc check timer with show types condition
    //@param project, timer
    //@result true/ false
    ////
    isShow(project: ProjectReportAdvance, timer: TimerAdvance): boolean{
        let num = parseInt(this.show_selected + '', 10);
        var value = false;
        switch(num){
            case 0:{ //show All Hours
                value = true;
                break;
            }
            case 1: {  //show Billible
                var pro_category = project.categories.find(x => x.id == timer.category_member.category_id)
                if(pro_category)
                    value = pro_category.is_billable;
                break;
            }
            case 2: {   //show unBillible
                var pro_category = project.categories.find(x => x.id == timer.category_member.category_id)
                if(pro_category)
                    value = !pro_category.is_billable;
                break;
            }
        }
        /** if have search character -> check timer in searchList */
        if(value && this.searchPattern.length > 0)
            return this.isPeopleInSearch(timer);
        return value;
    }

    ////
    //@function peopleInSearch
    //@desc check timer of people in searcList
    //@param timer
    //@result true/false
    ////
    isPeopleInSearch(timer: TimerAdvance): boolean{
        return ((this.searchList.findIndex(x => x == timer.category_member.member_id)) != -1)
    }

    ////
    //@function getProject
    //@desc find project from this._projects
    //@param id -> id of project in this._projects
    //@result ProjectReportAdvance
    ////
    getProject(id: number){
        return this._projects.find(x => x.id == id);
    }

    ////
    //@function getCategory
    //@desc get category in this.categories_selected
    //@param id -> id of category in this.categories_selected
    //@result categopryAdvance
    ////
    getCategory(id: number){
        return this.categories_selected.find(x => x.id == id);
    }

    ////
    //@function getCategory
    //@desc get category in a project
    //@param name -> name of category in project
    //@result categopryAdvance
    ////
    getProjectCategory(name: string, project: ProjectReportAdvance){
        return project.categories.find(x => x.name == name)
    }

    ////
    //@function getCategoryInProject
    //@desc get category in a project
    //@param project, id -> id of category in this.categories_selected
    //@result categopryAdvance
    ////
    getCategoryInProject(project: ProjectReportAdvance, id: number){
        var category = this.getCategory(id);
        return project.categories.find(x => x.name == category.name)
    }

    getMemberInProject(project: ProjectReportAdvance, member_id: number){
        var member = project.members.find(x => x.id == member_id);
        if(member) return member.user.last_name + " " + member.user.first_name;
        return 'Undefine';
    }
}
