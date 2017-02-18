import { Component, OnInit, Input, OnChanges, SimpleChange } from '@angular/core';
import { ProjectGetOne, ProjectCategoryMember, ProjectCategory }   from '../models/project';
import { User, UserTrackTime }   from '../models/user';
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
    membersDistionary: Array<UserTrackTime> = [];
    @Input() project: ProjectGetOne;
    constructor() { }

    ngOnInit() {
        if(this.project){
            this.membersDistionary = [];
            this.categoryOfMemberHash = new Map<Number, Array<CategoryTrackedTime>>();;
            this.project.project_category.forEach(res => {
                res.memberList.forEach(projectCategoryMember => {
                    var categoryTrackedTimes = this.categoryOfMemberHash.get(projectCategoryMember.user.id)
                    if(categoryTrackedTimes){
                        var categoryTrackedTime: CategoryTrackedTime = new CategoryTrackedTime();
                        categoryTrackedTime.category = res.category;
                        categoryTrackedTime.tracked_time = projectCategoryMember.tracked_time;

                        categoryTrackedTimes.push(categoryTrackedTime);
                        this.categoryOfMemberHash.set(projectCategoryMember.user.id, categoryTrackedTimes);

                        this.membersDistionary.forEach(member => {
                            if(member.user.id == projectCategoryMember.user.id)
                                member.tracked_time += projectCategoryMember.tracked_time

                        })
                    }
                    else{
                        categoryTrackedTimes = [];

                        var categoryTrackedTime: CategoryTrackedTime = new CategoryTrackedTime();
                        categoryTrackedTime.category = res.category;
                        categoryTrackedTime.tracked_time = projectCategoryMember.tracked_time;

                        categoryTrackedTimes.push(categoryTrackedTime);
                        this.categoryOfMemberHash.set(projectCategoryMember.user.id, categoryTrackedTimes);

                        var userTrackTime :UserTrackTime = new UserTrackTime();
                        userTrackTime.user = projectCategoryMember.user;
                        userTrackTime.tracked_time = projectCategoryMember.tracked_time;

                        this.membersDistionary.push(userTrackTime);
                    }
                    this.is_show_member_details.set(projectCategoryMember.user.id, false);
                    console.log('categorys', this.categoryOfMemberHash);
                })
            })
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
}
