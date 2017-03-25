import { Component, OnInit, Input, OnChanges, SimpleChange }     from '@angular/core';
import { ProjectReportAdvance, ProjectDefault }     from '../models/project';
import { TimerAdvance }                                 from '../models/timer';
import { Category }                     from '../models/category';
import { Member }                       from '../models/member';
import { User }                         from '../models/user';

@Component({
    selector: 'app-report-details-advances-list',
    templateUrl: './report-details-advances-list.component.html',
    styleUrls: ['./report-details-advances-list.component.scss']
})
export class ReportDetailsAdvancesListComponent implements OnInit, OnChanges {
    group_by_types = ["Category", "Person", "Date"]
    show_types = ["Billables", "Unbillable"]

    group_by_selected: number = 0;
    show_selected = 0;

    start_date: Date;
    end_date: Date;

    project_selected: ProjectDefault[];
    categories_selected: Category[];
    peoples_selected: Member[];
    days_selected: {
        id: number;
        name: Date
    }[];

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

    @Input() update: number;

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

    constructor() {}

    ngOnInit() {
        this.initVariableValue();
        this.view_selecteds = this.project_selected;
        this.selectGroup();
    }

    ngOnChanges(changes: {[propKey: string]: SimpleChange}){
        console.log('change', changes);
        this.ngOnInit();
    }

    initVariableValue(){
        this.project_selected = [];
        this.peoples_selected = [];
        this.categories_selected = [];
        this.days_selected = [];
        // var i = 1;
        // for(var date = this.start_date; date <= this.end_date; date.setDate(date.getDate() + 1)){
        //             this.days_selected.push({id: i++, name: date});
        //             date = new Date(date);
        // }
    }

    // when group by change -> update view_selecteds
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
                // this.view_selecteds = this.peoples_selected;
                // break;
            }
            case 3:{ //date type
                // this.view_selecteds = this.days_selected;
                // break;
            }
            default: {
                this.view_selecteds = [];
            }
        }
    }

    selectShow(){
        console.log('select Show', this.show_selected);
    }

    ////
    //@function isConstraintItem
    //@desc check projects constraint item or not? if constraint project able to show
    //@param project_id: number, item_id: number
    //@result true/ if project constraint item
    ////
    isConstraintItem(project_id: number, item_id: number){
        // console.log('constraint item', item_id, 'in', project_id);

        let value = false;
        let num = parseInt(this.group_by_selected + '', 10);

        var project = this.getProject(project_id);
        if(!project) return false;
        switch(num){
            case 0:{ //item is project type
                value = (project.id == item_id);
                break;
            }
            case 1:{ //item is category type
                    var category = this.getCategory(item_id);
                    var pro_category = project.categories.find(x => x.name == category.name);
                    if(category){ // category in project
                        var pro_category = project.categories.find(x => x.name == category.name);
                        if(pro_category) // any timers in category or not. false if not
                            value = project.timers.findIndex(x => x.category_member.category_id == pro_category.id) != -1;
                    }
                break;
            }
            case 2:{ //item is people type
                // value = project.timers.findIndex(x => x.category_member.member_id == item_id) != -1;
                break;
            }
            case 3:{ //item is date type
                // var day = this.days_selected.find(x => x.id == item_id);
                // if(day){
                //     // console.log('day', day)
                //     for( let timer of project.timers){
                //         var date = this.convertDate(timer.start_time);
                //         // console.log('date', date)
                //         // console.log('date', date, 'time', date.getTime(), 'day.name', day.name, 'compare', 'time', day.name.getTime(), (date.getTime() == day.name.getTime()));
                //         if(date.getTime() == day.name.getTime())
                //             return true;
                //     }
                // }
                break;
            }
        }
        return value;
    }

    //get tracked_time of item in project
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
                // project.timers.forEach(timer => {
                //     // console.log('timer', timer.category_member.tracked_time, 'tracked timer', tracked_time)
                //     if(timer.category_member.member_id == item_id)
                //         tracked_time += timer.tracked_time;
                // })
                break;
            }
            case 3:{ //date type
                // var day = this.days_selected.find(x => x.id == item_id);
                // project.timers.forEach(timer => {
                //     var date = this.convertDate(timer.start_time);
                //     if(date.getTime() == day.name.getTime())
                //         tracked_time += timer.tracked_time;
                // })
                break;
            }
        }
        return tracked_time;
    }

    // list timer pass condition, using for show
    timersShow(project_id: number, item_id: number){
        let tracked_time = 0;
        let project = this.getProject(project_id);
        var timers_show: TimerAdvance[] = [];

        let num = parseInt(this.group_by_selected + '', 10);
        switch(num){
            case 0:{ //item is project type
                timers_show = project.timers;
                break;
            }
            case 1:{ //item is category type
                var category = this.getCategory(item_id);
                project.timers.forEach(timer => {
                    if(timer.category_member.category_id == item_id)
                        timers_show.push(timer);
                })
                break;
            }
            case 2:{ //item is people type
                // var member = project.members.find(x => x.id == item_id);
                // project.timers.forEach(timer => {
                //     if(timer.category_member.member_id == member.id)
                //         timers_show.push(timer);
                // })
                break;

            }
            case 3:{ //item is date type
                // var day = this.days_selected.find(x => x.id == item_id);
                // project.timers.forEach(timer => {
                //     // console.log('timer', timer.category_member.tracked_time, 'tracked timer', tracked_time)
                //     var date = this.convertDate(timer.start_time);
                //     if(date.getTime() == day.name.getTime())
                //         timers_show.push(timer);
                // })
                break;
            }
        }
        return timers_show;
    }

    // convertDate(date: any): Date{
    //     date = new Date(date);
    //     date.setHours(0, 0, 0, 0);
    //     return date;
    // }

    // find project from this._projects
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

    // get category in project when know category name
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
