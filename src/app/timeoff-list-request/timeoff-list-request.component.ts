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
export class TimeoffListRequestComponent implements OnInit, OnChanges {
    show_description_details: Map<Number, Number> = new Map<Number, Number>();
    show_timeoff_details: Map<Number, boolean> = new Map<Number, boolean>();

    /** list timeoffs get from parent */
    list_timeoff :TimeOff[] = [];
    /** list timeoffs using for view folllow sort types */
    _timeoffs :TimeOff[] = [];
    /** list timeoffs using for view. Using this variable because view can follow search*/
    current_timeoffs :TimeOff[] = [];
    _personNumTimeOff: PersonNumTimeOff = new PersonNumTimeOff();

    types = ['All types', 'pending', 'approved', 'rejected']
    type = 'All types'

    /** using search */
    searchPattern: string = '';

    @Input()
    set timeoffs(timeoffs: TimeOff[]){
        this.list_timeoff = timeoffs || [];
    }

    @Input()
    set personNumTimeOff(personNumTimeOff: PersonNumTimeOff){
        this._personNumTimeOff = personNumTimeOff;
    }

    @Output() reload = new EventEmitter();

    constructor(private router: Router, private timeoffService: TimeoffService) { }

    ngOnInit() {
        this._timeoffs = this.list_timeoff;
        this.sortNewest();
        this.current_timeoffs = this._timeoffs;
    }

    ngOnChanges(changes: {[propKey: string]: SimpleChange}){
        if(changes['timeoffs']) this.ngOnInit();
    }

    ////
    //@function sort newest
    //@desc sort list _timeoffs DESC day updated
    //@param
    //@result void
    ////
    sortNewest(){
        if(this._timeoffs.length > 1){
            this._timeoffs.sort(function(a, b){
                if(a.updated_at > b.updated_at) return -1;
                if(a.updated_at < b.updated_at) return 1;
                return 0;
            });
            this.initializeDescriptionStatus();
        }
    }

    ////
    //@function initialize description status each timeoff
    //@desc each timeoff show descriptio when hander click action, so it initialized show is false
    //@param
    //@result void
    ////
    // initialize_description_status(){
    initializeDescriptionStatus(){
        this.show_timeoff_details = new Map<Number, boolean>();
        this.show_description_details = new Map<Number, Number>();
        this._timeoffs.forEach((timeoff) =>{
            this.show_timeoff_details.set(timeoff.id, false);
        })
    }

    ////
    //@function sort
    //@desc sort list_timeoff follow status
    //@param
    //@result void
    ////
    sort(){
        switch(this.type){
            case 'pending': {
                this._timeoffs = [];
                this.list_timeoff.forEach((timeoff) => {
                    if(timeoff.status == 'pending')
                    this._timeoffs.push(timeoff);
                })
                this.sortNewest();
                break;
            }
            case 'approved':{
                this._timeoffs = [];
                this.list_timeoff.forEach((timeoff) => {
                    if(timeoff.status == 'approved')
                    this._timeoffs.push(timeoff);
                })
                this.sortNewest();
                break;
            }
            case 'rejected':{
                this._timeoffs = [];
                this.list_timeoff.forEach((timeoff) => {
                    if(timeoff.status == 'rejected')
                    this._timeoffs.push(timeoff);
                })
                this.sortNewest();
                break;
            }
            default: {
                this.ngOnInit();
            }
        }
        this.current_timeoffs = this._timeoffs;
    }

    ////
    //@function show timeoff details
    //@desc handler click action -> show details timeoff status
    //@param timeoff_id to get timeoff's show description status and update
    //@result void
    ////
    showDetails(id: Number){
        this.show_timeoff_details.get(id)? $('#description-details-'+id).css({'display': 'none'}):
            $('#description-details-'+id).css({'display': 'block'})
        this.show_timeoff_details.set(id, !this.show_timeoff_details.get(id))
    }

    ////
    //@function show timeoff control
    //@desc handler mouseover/mouseleave action -> show timeoff control
    //@param is_show and timeoff_id
    //@result void
    ////
    showTimeoffControl(is_show: boolean,id: number){
        is_show? $('#your-timeoff-control-'+id).css({'display': 'inline-block'}) :
            $('#your-timeoff-control-'+id).css({'display': 'none'});
    }

    search(){
        this.current_timeoffs = [];
        for (var i = 0; i < this._timeoffs.length; i++){
            var timeoff = this._timeoffs[i];
            if(timeoff.description.search(this.searchPattern) != -1)
                this.current_timeoffs.push(timeoff);
        }
    }

    ////
    //@function show timeoff controledit timeoff
    //@desc navigate to edit timeoff pages
    //@param timeoff_id
    //@result void
    ////
    edit(id: number){
        this.router.navigate(['/edit-timeoff/'+id]);
    }

    ////
    //@function delete timeoff controledit timeoff
    //@desc delete timeoff
    //@param timeoff_id
    //@result void
    ////
    delete(id: number){
        this.timeoffService.delete(id,)
        .then(
            (result) => {
                this.reload.emit();
            },
            (errors) => {
                alert(errors.json().error);
                console.log('timeoff error', errors.json().error);
            }
        )
    }
}
