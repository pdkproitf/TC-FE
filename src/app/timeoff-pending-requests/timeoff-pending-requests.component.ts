import { Component, OnInit, Input, OnChanges, SimpleChange }    from '@angular/core';
import { TimeOff }              from '../models/timeoff';
declare var $:any;

@Component({
    selector: 'app-timeoff-pending-requests',
    templateUrl: './timeoff-pending-requests.component.html',
    styleUrls: ['./timeoff-pending-requests.component.scss']
})
export class TimeoffPendingRequestsComponent implements OnInit, OnChanges {
    is_show_pending_details: Map<Number, Boolean> = new Map<Number, Boolean>();
    _timeoffs: TimeOff[] = [];
    @Input()
    set timeoffs(timeoffs: TimeOff[]){
        this._timeoffs = timeoffs || [];
        this.sortNewest();
    }

    constructor() { }

    ngOnInit() {

    }

    ngOnChanges(changes: {[propKey: string]: SimpleChange}){
        if(changes['timeoffs']) this.ngOnInit();
    }

    sortNewest(){
        if(this._timeoffs.length > 1){
            this._timeoffs.sort(function(a, b){
                if(a.updated_at > b.updated_at) return -1;
                if(a.updated_at < b.updated_at) return 1;
                return 0;
            });
            this.setShowPenddingDetails();
        }
    }

    setShowPenddingDetails(){
        this.is_show_pending_details = new Map<Number, boolean>();
        this._timeoffs.forEach(timeoff => {
            this.is_show_pending_details.set(timeoff.id, false);
        })
    }

    showDetails(timeoff_id: number){
        var cf = this.is_show_pending_details.get(timeoff_id);
        cf? $('#description-'+timeoff_id).css({'display': 'none'}) : $('#description-'+timeoff_id).css({'display': 'block'})
        this.is_show_pending_details.set(timeoff_id, !cf);
    }
}
