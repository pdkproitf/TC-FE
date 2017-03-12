import { Component, OnInit, Input, OnChanges, SimpleChange, EventEmitter, Output }    from '@angular/core';
import { TimeOff, TimeOffPost, PersonNumTimeOff } from './../models/timeoff';
import { TimeoffService }       from '../services/timeoff-service';
import { Router }               from '@angular/router'
declare var $:any;

@Component({
    selector: 'app-timeoff-list-request',
    templateUrl: './timeoff-list-request.component.html',
    styleUrls: ['./timeoff-list-request.component.scss']
})
export class TimeoffListRequestComponent implements OnInit {
    constructor(private router: Router, private timeoffService: TimeoffService) { }

    show_description_details: Map<Number, Number> = new Map<Number, Number>();
    show_timeoff_details: Map<Number, boolean> = new Map<Number, boolean>();

    _timeoffs :TimeOff[] = [];
    _personNumTimeOff: PersonNumTimeOff = new PersonNumTimeOff();

    @Input()
    set timeoffs(timeoffs: TimeOff[]){
        this._timeoffs = timeoffs || [];
        console.log("timeOffs", timeoffs);
        this.sortNewest();
    }

    @Input()
    set personNumTimeOff(personNumTimeOff: PersonNumTimeOff){
        this._personNumTimeOff = personNumTimeOff;
    }

    @Output() reload = new EventEmitter();

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

    showTimeoffControl(is_show: boolean,id: number){
        is_show? $('#your-timeoff-control-'+id).css({'display': 'inline-block'}) : $('#your-timeoff-control-'+id).css({'display': 'none'});
    }

    edit(id: number){
        this.router.navigate(['/edit-timeoff/'+id]);
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
}
