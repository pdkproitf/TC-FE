import { Component, OnInit, OnChanges, SimpleChange }    from '@angular/core';
import { TimeOff }              from '../models/timeoff';
import { TimeoffService }       from '../services/timeoff-service';
import { TimeOffArray }              from '../models/timeoff';
declare var $:any;

@Component({
    selector: 'app-timeoff-list-request',
    templateUrl: './timeoff-list-request.component.html',
    styleUrls: ['./timeoff-list-request.component.scss']
})
export class TimeoffListRequestComponent implements OnInit {
    constructor(private timeoffService: TimeoffService) { }
    timeoffs :TimeOff[] = [];
    show_description_details: Map<Number, Number> = new Map<Number, Number>();
    show_timeoff_details: Map<Number, boolean> = new Map<Number, boolean>();

    ngOnInit() {
        this.timeoffs = new TimeOffArray().timeoffs;
        console.log("timeOffs", this.timeoffs);
        this.timeoffService.getTimeOffs().then(
            (result) => {
                this.timeoffs = result;
                this.sortNewest();
                console.log('result',result);
            },
            (error) => {
                alert(error);
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
            this.initialize_description_status();
        }
    }

    initialize_description_status(){
        this.show_timeoff_details = new Map<Number, boolean>();
        this.show_description_details = new Map<Number, Number>();
        this.timeoffs.forEach((timeoff) =>{
            this.show_timeoff_details.set(timeoff.id, false);
        })
    }

    all_types(){
        console.log('all types');
    }

    showDetails(id: Number){
        this.show_timeoff_details.get(id)? $('#description-details-'+id).css({'display': 'none'}):$('#description-details-'+id).css({'display': 'block'})
        this.show_timeoff_details.set(id, !this.show_timeoff_details.get(id))
    }
}
