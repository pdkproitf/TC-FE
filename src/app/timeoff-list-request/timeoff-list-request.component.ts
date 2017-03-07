import { Component, OnInit, Input, OnChanges, SimpleChange }    from '@angular/core';
import { TimeOff }              from '../models/timeoff';
declare var $:any;

@Component({
    selector: 'app-timeoff-list-request',
    templateUrl: './timeoff-list-request.component.html',
    styleUrls: ['./timeoff-list-request.component.scss']
})
export class TimeoffListRequestComponent implements OnInit {
    constructor() { }
    show_description_details: Map<Number, Number> = new Map<Number, Number>();
    show_timeoff_details: Map<Number, boolean> = new Map<Number, boolean>();

    _timeoffs :TimeOff[] = [];
    @Input()
    set timeoffs(timeoffs: TimeOff[]){
        this._timeoffs = timeoffs || [];
        console.log("timeOffs", timeoffs);
        this.sortNewest();
    }
    ngOnInit() {
    }

    sortNewest(){
        if(this._timeoffs.length > 1){
            this._timeoffs.sort(function(a, b){
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
        this._timeoffs.forEach((timeoff) =>{
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
