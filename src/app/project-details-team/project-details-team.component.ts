import { Component, OnInit, Input, OnChanges, SimpleChange } from '@angular/core';
import { ProjectGetOne, ProjectCategoryMember, ProjectCategory }   from '../models/project';
import { User, UserRoleTrackTime }   from '../models/user';
import { CategoryTrackedTime }   from '../models/category';
declare var $:any;

@Component({
    selector: 'app-project-details-team',
    templateUrl: './project-details-team.component.html',
    styleUrls: ['./project-details-team.component.scss']
})
export class ProjectDetailsTeamComponent implements OnInit, OnChanges {
    is_show_member_details: Map<Number, boolean> = new Map<Number, boolean>();
    categoryOfMemberHash: Map<Number, Array<CategoryTrackedTime>> = new Map<Number, Array<CategoryTrackedTime>>();
    membersDistionary: Array<UserRoleTrackTime> = [];
    @Input() project: ProjectGetOne;
    constructor() { }

    ngOnInit() {
        if(this.project){
            this.membersDistionary = [];
            this.categoryOfMemberHash = new Map<Number, Array<CategoryTrackedTime>>();;
            this.handlingData();
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

    handlingData(){
        this.project.project_category.forEach(res => {
            res.memberList.forEach(projectCategoryMember => {
                var categoryTrackedTimes = this.categoryOfMemberHash.get(projectCategoryMember.user.id)
                if(categoryTrackedTimes){
                    this.computeTotalTimeOfMember(projectCategoryMember);
                }else{
                    categoryTrackedTimes = [];
                    // convert to user track time for distionary
                    this.membersDistionary.push(this.convetUserTrachTime(projectCategoryMember));
                }
                // updat hash
                categoryTrackedTimes.push(this.convetProjectCategoryMember(res, projectCategoryMember));
                this.categoryOfMemberHash.set(projectCategoryMember.user.id, categoryTrackedTimes);

                this.is_show_member_details.set(projectCategoryMember.user.id, false);
            })
        })
    }

    convetUserTrachTime(object: Object): UserRoleTrackTime{
        var userTrackTime :UserRoleTrackTime = new UserRoleTrackTime();
        userTrackTime.user = object['user'];
        userTrackTime.tracked_time = object['tracked_time'];
        userTrackTime.roles = object['roles'];
        return userTrackTime;
    }

    convetProjectCategoryMember(res:Object, projectCategoryMember: Object): CategoryTrackedTime{
        // convert to CategoryTrackedTime fo hash
        var categoryTrackedTime: CategoryTrackedTime = new CategoryTrackedTime();
        categoryTrackedTime.category = res['category'];
        categoryTrackedTime.tracked_time = projectCategoryMember['tracked_time'];
        return categoryTrackedTime;
    }

    // compute total time of a member
    computeTotalTimeOfMember(projectCategoryMember: Object){
        this.membersDistionary.forEach(member => {
            if(member.user.id == projectCategoryMember['user']['id'])
            member.tracked_time += projectCategoryMember['tracked_time']
        })
    }
}
