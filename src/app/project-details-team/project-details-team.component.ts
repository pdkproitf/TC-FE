import { Component, OnInit, Input } from '@angular/core';
import { ProjectGetOne }   from '../models/project';
declare var $:any;

@Component({
    selector: 'app-project-details-team',
    templateUrl: './project-details-team.component.html',
    styleUrls: ['./project-details-team.component.scss']
})
export class ProjectDetailsTeamComponent implements OnInit {
    is_show_team_user_details: boolean = false;
    constructor() { }
    @Input() project: ProjectGetOne;
    ngOnInit() {
    }

    team_user_details(){
        if(!this.is_show_team_user_details){
            $('.fa-plus').removeClass('fa-plus').addClass('fa-minus');
            $('.group-tasks').css({'display': 'block'});
            $('.user-tasks').css({'display': 'none'});
        }else{
            $('.fa-minus').removeClass('fa-minus').addClass('fa-plus');
            $('.group-tasks').css({'display': 'none'});
            $('.user-tasks').css({'display': 'block'});
        }
        this.is_show_team_user_details = !this.is_show_team_user_details;
    }
}
