import { Component, OnInit, Input, OnChanges, SimpleChange } from '@angular/core';
import { ProjectGetOne }   from '../models/project';
import { User }   from '../models/user';
declare var $:any;

@Component({
    selector: 'app-project-details-team',
    templateUrl: './project-details-team.component.html',
    styleUrls: ['./project-details-team.component.scss']
})
export class ProjectDetailsTeamComponent implements OnInit, OnChanges {
    is_show_member_details: Map<Number, boolean> = new Map<Number, boolean>();
    membersHash: Map<Number, Array<String>> = new Map<Number, Array<String>>();
    membersDistionary: Array<User> = [];
    @Input() project: ProjectGetOne;
    constructor() { }

    ngOnInit() {
        if(this.project){
            this.membersDistionary = [];
            this.membersHash = new Map<Number, Array<String>>();;
            this.project.project_category.forEach(res => {
                res.memberList.forEach(user => {
                    var arr = this.membersHash.get(user.id)
                    if(arr){
                        arr.push(res.category.name);
                        this.membersHash.set(user.id, arr);
                    }else{
                        arr = [];
                        arr.push(res.category.name);
                        this.membersHash.set(user.id, arr);
                        this.membersDistionary.push(user);
                    }
                    this.is_show_member_details.set(user.id, false);
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
            $('#team-row-'+id).find('.group-tasks').css({'display': 'none'});
            $('#team-row-'+id).find('.user-tasks').css({'display': 'block'});
        }else{
            $('#team-row-'+id).find('.fa-plus').removeClass('fa-plus').addClass('fa-minus');
            $('#team-row-'+id).find('.group-tasks').css({'display': 'block'});
            $('#team-row-'+id).find('.user-tasks').css({'display': 'none'});
        }
        this.is_show_member_details.set(id, !flag);
    }
}
