import { TimeOff, TimeOffGetAll }   from '../models/timeoff';
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
    userObj: Object;

    constructor(private router: Router, private timeoffService: TimeoffService) { }

    ngOnInit() {
        this.timeoffService.getTimeOffs().then(
            (result) => {
                this.list_timeoff = result;
                console.log('list_timeoff',result);
            },
            (error) => {
                // alert(error);
                console.log('error',error);
            }
        );
        let userInfo = localStorage.getItem('UserInfo');
        this.userObj = JSON.parse(userInfo);
    }

    createTimeOff(){
        this.router.navigate(['/new-timeoff']);
    }
}
