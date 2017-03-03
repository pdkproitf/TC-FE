import { Component, OnInit }    from '@angular/core';
import { TimeoffService }       from '../services/timeoff-service';
import { TimeOff }              from '../models/timeoff';
declare var $:any;

@Component({
    selector: 'app-timeoff-pending-requests',
    templateUrl: './timeoff-pending-requests.component.html',
    styleUrls: ['./timeoff-pending-requests.component.scss']
})
export class TimeoffPendingRequestsComponent implements OnInit {
    timeoffs :TimeOff[] = [];
    arr: Number[] = [0, 1, 2, 3, 4];
    is_arr: Array<Boolean> = [false, false, false, false, false];

    constructor(private timeoffService: TimeoffService) { }

    ngOnInit() {
        console.log("timeOffs", this.timeoffs);
        this.timeoffService.getTimeOffPendings().then(
            (result) => {
                this.timeoffs = result;
                this.sortNewest();
                console.log('result',result);
            },
            (error) => {
                // alert(error);
                console.log('error',error);
            }
        );
    }

    sortNewest(){
        if(this.timeoffs.length > 1){
            this.timeoffs.sort(function(a, b){
                if(a.updated_at > b.updated_at) return -1;
                if(a.updated_at < b.updated_at) return 1;
                return 0;
            });
        }
    }

    showDetails(number: number){
        this.is_arr[number]? $('#description-'+number).css({'display': 'none'}) : $('#description-'+number).css({'display': 'block'})
        this.is_arr[number] = !this.is_arr[number];
    }
}
