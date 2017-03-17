import { TimeOff, TimeOffGetAll, PersonNumTimeOff }   from '../models/timeoff';
import { Component, OnInit }        from '@angular/core';
import { TimeoffService }           from '../services/timeoff-service';
import { Router }                   from '@angular/router'

@Component({
    selector: 'app-timeoff-manage',
    templateUrl: './timeoff-manage.component.html',
    styleUrls: ['./timeoff-manage.component.scss']
})
export class TimeoffManageComponent implements OnInit {

    list_timeoff: TimeOffGetAll = new TimeOffGetAll();
    personNumTimeOff: PersonNumTimeOff = new PersonNumTimeOff();
    userObj: Object;

    constructor(private router: Router, private timeoffService: TimeoffService) { }

    ngOnInit() {
        this.getTimeOffsPending();
        let userInfo = localStorage.getItem('UserInfo');
        this.userObj = JSON.parse(userInfo);
    }

    createTimeOff(){
        this.router.navigate(['/new-timeoff']);
    }

    getTimeOffsPending(){
        var this_year = new Date(new Date().getFullYear(), 0, 1);
        this.timeoffService.getPhaseTimeOffs(this_year,new Date()).then(
            (result) => {
                this.list_timeoff = result;
            },
            (error) => {
                // alert(error);
                console.log('error',error);
            }
        );
        this.getPersonNumTimeOff();
    }

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
