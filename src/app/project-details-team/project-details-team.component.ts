import { Component, OnInit, Input, OnChanges, SimpleChange }    from '@angular/core';
import { CategoryTrackedTime, CategoryGetOne, Category }        from '../models/category';
import { MemberTrackTime, Member }      from '../models/member';
import { ProjectGetOne }                from '../models/project';
declare var $:any;

@Component({
    selector: 'app-project-details-team',
    templateUrl: './project-details-team.component.html',
    styleUrls: ['./project-details-team.component.scss']
})
export class ProjectDetailsTeamComponent implements OnInit, OnChanges {
    is_show_member_details: Map<Number, boolean> = new Map<Number, boolean>();
    categoryOfMemberHash: Map<Number, Array<CategoryTrackedTime>> = new Map<Number, Array<CategoryTrackedTime>>();
    membersDistionary: Array<MemberTrackTime> = [];

    @Input()
    set project(project: ProjectGetOne){
        if(project){
            console.log('project team ', project);
            this.categoryOfMemberHash = new Map<Number, Array<CategoryTrackedTime>>();
            project.members.forEach((member) => {
                this.membersDistionary.push(new MemberTrackTime(member));
            })
            project.categories.forEach(category => {
                category.members.forEach(member => {
                    var arr = this.categoryOfMemberHash.get(member.id);
                    if(!arr) arr = [];

                    arr.push(this.getCategoryMemberTrackdTime(category, member));
                    this.updateDisMemberTrackTime(member);
                    this.categoryOfMemberHash.set(member.id, arr);
                })
            })
        }
    }

    constructor() { }

    ngOnInit() {
        if(this.project){
            this.membersDistionary = [];
            this.categoryOfMemberHash = new Map<Number, Array<CategoryTrackedTime>>();;
        }
    }

    ngOnChanges(changes: {[propKey: string]: SimpleChange}){
        if(changes['project']) this.ngOnInit();
    }

    team_user_details(id: Number){
        var flag = this.is_show_member_details.get(id);
        if(flag){
            $('#team-row-'+id).find('.fa-minus').removeClass('fa-minus').addClass('fa-plus');

            $('#team-row-'+id).find('.user-tasks').css({'display': 'block'});
            $('#team-row-'+id).find('.user-list-tasks').css({'display': 'none'});
            $('#team-row-'+id).find('.member-tracker').css({'display': 'none'})
        }else{
            $('#team-row-'+id).find('.fa-plus').removeClass('fa-plus').addClass('fa-minus');

            $('#team-row-'+id).find('.user-tasks').css({'display': 'none'});
            $('#team-row-'+id).find('.user-list-tasks').css({'display': 'block'});
            $('#team-row-'+id).find('.member-tracker').css({'display': 'block'});
        }
        this.is_show_member_details.set(id, !flag);
    }

    getCategoryMemberTrackdTime(categoryOne: CategoryGetOne, member: Object): CategoryTrackedTime{
        var cateTracked = new CategoryTrackedTime();

        var category = new Category();
        category.id = categoryOne.id;
        category.name = categoryOne.name;
        category.category_member_id = member['category_member_id'];

        cateTracked.category = category;
        cateTracked.tracked_time = member['tracked_time'];

        return cateTracked;
    }

    updateDisMemberTrackTime(member: Object){
        // update total tracketime for member
        for (var i in this.membersDistionary) {
            if (this.membersDistionary[i].id == member['id']) {
                this.membersDistionary[i].tracked_time += member['tracked_time'];
                this.membersDistionary[i].is_pm = Boolean(member['is_pm']);
                break; //Stop this loop, we found it!
            }
        }
    }
}
