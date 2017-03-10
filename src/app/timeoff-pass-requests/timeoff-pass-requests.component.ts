import { Component, OnInit }        from '@angular/core';
import { TimeoffService }           from '../services/timeoff-service';
import { TimeOff, TimeOffGetAll, TimeOffAnswer } from './../models/timeoff';
import { Member }                   from '../models/member';

@Component({
    selector: 'app-timeoff-pass-requests',
    templateUrl: './timeoff-pass-requests.component.html',
    styleUrls: ['./timeoff-pass-requests.component.scss']
})
export class TimeoffPassRequestsComponent implements OnInit {
    _timeoffs: TimeOff[] = [];

    constructor(private timeoffService: TimeoffService) {
        this.getTimeOffsPending();
    }

    ngOnInit() {
    }

    getTimeOffsPending(){
        this.timeoffService.getAllTimeOffs().then(
            (result) => {
                this._timeoffs = result;
                console.log('list_timeoff',result);
            },
            (error) => {
                // alert(error);
                console.log('error',error);
            }
        );
    }
}
