import { Component, OnInit, Input, Output, OnChanges, SimpleChange, EventEmitter }    from '@angular/core';
import { TimeOff, TimeOffAnswer }   from '../models/timeoff';
import { TimeoffService }           from '../services/timeoff-service';
import { Member }                   from '../models/member';
declare var $:any;

@Component({
    selector: 'app-timeoff-pending-requests',
    templateUrl: './timeoff-pending-requests.component.html',
    styleUrls: ['./timeoff-pending-requests.component.scss']
})
export class TimeoffPendingRequestsComponent implements OnInit, OnChanges {
    is_show_pending_details: Map<Number, Boolean> = new Map<Number, Boolean>();
    _timeoffs: TimeOff[] = [];
    timeOffPut: TimeOffAnswer;
    user: Member ;
    is_show_all :Boolean = false;
    this_year = new Date(new Date().getFullYear(), 0, 1);
    @Input()
    set timeoffs(timeoffs: TimeOff[]){
        this._timeoffs = timeoffs || [];
        this.sortNewest();
    }
    @Input()
    set showAll(show: Boolean){
        this.is_show_all = show;
    }

    @Output() reload = new EventEmitter();

    constructor(private timeoffService: TimeoffService) { }

    ngOnInit() {
        this.timeOffPut = new TimeOffAnswer();
        let userInfo = localStorage.getItem('UserInfo');
        this.user = JSON.parse(userInfo);
        var date = new Date();
        console.log('date - - - - -  '+new Date(new Date().getFullYear(), 0, 1));
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
        this.timeoffService.delete(id,)
        .then(
            (result) => {
                console.log('timeoff delete', result);
                this.reload.emit();
            },
            (errors) => {
                alert(errors.json().error);
                console.log('timeoff error', errors.json().error);
            }
        )
    }

    showForm(status: string){
        this.timeOffPut.answer_timeoff_request.status = status;
    }

    update(id: number, $event){
        this.timeoffService.update(id, this.timeOffPut).then(
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
