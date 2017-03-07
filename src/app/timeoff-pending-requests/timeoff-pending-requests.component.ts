import { Component, OnInit, Input, Output, OnChanges, SimpleChange, EventEmitter }    from '@angular/core';
import { TimeOff, TimeOffPut }              from '../models/timeoff';
import { TimeoffService }       from '../services/timeoff-service';
declare var $:any;

@Component({
    selector: 'app-timeoff-pending-requests',
    templateUrl: './timeoff-pending-requests.component.html',
    styleUrls: ['./timeoff-pending-requests.component.scss']
})
export class TimeoffPendingRequestsComponent implements OnInit, OnChanges {
    is_show_pending_details: Map<Number, Boolean> = new Map<Number, Boolean>();
    _timeoffs: TimeOff[] = [];
    timeOffPut: TimeOffPut;
    @Input()
    set timeoffs(timeoffs: TimeOff[]){
        this._timeoffs = timeoffs || [];
        this.sortNewest();
    }

    @Output() reload = new EventEmitter();

    constructor(private timeoffService: TimeoffService) { }

    ngOnInit() {
        this.timeOffPut = new TimeOffPut();
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

    showTimeoffControl(is_show: boolean, id: number){
        is_show? $('#timeoff-control-'+id).css({'display': 'inline-block'}) : $('#timeoff-control-'+id).css({'display': 'none'});
    }

    edit(id: number){
        console.log('edit timeoff '+id);
    }

    delete(id: number){
        console.log('delete timeoff '+id);
    }

    showForm(status: string){
        this.timeOffPut.answer_timeoff_request.status = status;
    }

    update(id: number, $event){
        this.timeoffService.answerTimeOff(id, this.timeOffPut).then(
            (result) => {
                console.log('TimeOff' + id +'update Sucess');
                this.reload.emit();
            },
            (error) => {
                console.log(error.data);
            }
        )
    }
}
