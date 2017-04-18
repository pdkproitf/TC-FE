import { TimeOff, TimeOffGetAll, PersonNumTimeOff }   from '../../models/timeoff';
import { Component, OnInit }        from '@angular/core';
import { TimeoffService }           from '../../services/timeoff-service';
import { Router }                   from '@angular/router';

@Component({
    selector: 'app-timeoff-manage',
    templateUrl: './timeoff-manage.component.html',
    styleUrls: ['./timeoff-manage.component.scss']
})
export class TimeoffManageComponent implements OnInit {

    list_timeoff: TimeOffGetAll = new TimeOffGetAll();
    personNumTimeOff: PersonNumTimeOff = new PersonNumTimeOff();
    userObj: Object;

    /** numof timeoff pending show in a page*/
    rowOfPage = 8
    timeoffRequest: number;

    constructor(private router: Router, private timeoffService: TimeoffService) { }

    ngOnInit() {
        this.getTimeOffsPending();
        let userInfo = localStorage.getItem('UserInfo');
        this.userObj = JSON.parse(userInfo);
    }

    createTimeOff(){
        this.router.navigate(['/new-timeoff']);
    }

    ////
    //@function get timeoffs
    //@desc get list timeoffs with current_member role when start_date later than today
    //@param void
    //@result
    ////
    getTimeOffsPending(){
        var this_year = new Date(new Date().getFullYear(), 0, 1);
        this.timeoffService.getPhaseTimeOffs(this_year,new Date()).then(
            (result) => {
                this.list_timeoff = result;
                this.timeoffRequest = result.pending_requests.length;
            },
            (error) => {
                // alert(error);
                console.log('error',error);
            }
        );
        this.getPersonNumTimeOff();
    }

    ////
    //@function get number timeoff
    //@desc get number timeoff of current_member
    //@param void
    //@result
    ////
    getPersonNumTimeOff(){
        var this_year = new Date(new Date().getFullYear(), 0, 1);
        this.timeoffService.getPersonNumTimeOff().then(
            (result) => {
                this.personNumTimeOff = result;
            },
            (error) => {
                // alert(error);
                console.log('error',error);
            }
        );
    }
}
