import { TimeOff, TimeOffGetAll, TimeOffAnswer } from '../../models/timeoff';
import { Component, OnInit }        from '@angular/core';
import { TimeoffService }           from '../../services/timeoff-service';
import { Member }                   from '../../models/member';

@Component({
    selector: 'app-timeoff-pass-requests',
    templateUrl: './timeoff-pass-requests.component.html',
    styleUrls: ['./timeoff-pass-requests.component.scss']
})
export class TimeoffPassRequestsComponent implements OnInit {
    _timeoffs: TimeOff[] = [];
    list_timeoff: TimeOff[] = [];
    type_request = ['All request', 'pending', 'approved', 'rejected']
    type_select = 'All request';

    /** numof timeoff pending show in a page*/
    rowOfPage: number = 8;

    constructor(private timeoffService: TimeoffService) {
        this.getTimeOffsPending();
    }

    ngOnInit() {
        this._timeoffs = this.list_timeoff;
    }

    ////
    //@function get timeoffs
    //@desc get list timeoffs with current_member role when start_date is begining of year
    //@param void
    //@result
    ////
    getTimeOffsPending(){
        this.timeoffService.getAllTimeOffs().then(
            (result) => {
                this.list_timeoff = result;
                this._timeoffs = this.list_timeoff;
            },
            (error) => {
                // alert(error);
                console.log('error',error);
            }
        );
    }

    ////
    //@function sort
    //@desc sort list_timeoff follow status
    //@param void
    //@result
    ////
    sort(){
        switch(this.type_select){
            case 'pending': {
                this._timeoffs = [];
                this.list_timeoff.forEach((timeoff) => {
                    if(timeoff.status == 'pending')
                        this._timeoffs.push(timeoff);
                })
                break;
            }
            case 'approved':{
                this._timeoffs = [];
                this.list_timeoff.forEach((timeoff) => {
                    if(timeoff.status == 'approved')
                        this._timeoffs.push(timeoff);
                })
                break;
            }
            case 'rejected':{
                this._timeoffs = [];
                this.list_timeoff.forEach((timeoff) => {
                    if(timeoff.status == 'rejected')
                        this._timeoffs.push(timeoff);
                })
                break;
            }
            default: {
                this.ngOnInit();
            }
        }
    }
}
