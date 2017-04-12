import { Component, OnInit, Input, Output, OnChanges, SimpleChange, EventEmitter }    from '@angular/core';
import { TimeOff, TimeOffAnswer }   from '../models/timeoff';
import { TimeoffService }           from '../services/timeoff-service';
import { Message }                  from 'primeng/primeng';
import { Member }                   from '../models/member';
import { Router }                   from '@angular/router'

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

    is_show_all :Boolean = false; //using for show  status thumble
    this_year = new Date(new Date().getFullYear(), 0, 1);
    today = new Date();

    /** show notification */
    msgs: Message[] = [];

    current_page: number = 1;
    rowOfPage: number = 8;

    @Input()
    set timeoffs(timeoffs: TimeOff[]){
        this._timeoffs = timeoffs || [];
        this.sortNewest();
    }

    @Input()
    set showAll(show: Boolean){
        this.is_show_all = show;
    }

    @Input()
    set rowsOfPage(num: number){
        console.log('get row of page', num);
        this.rowOfPage = num;
    }

    @Output() reload = new EventEmitter();

    constructor(private timeoffService: TimeoffService, private router: Router) { }

    ngOnInit() {
        this.timeOffPut = new TimeOffAnswer();
        let userInfo = localStorage.getItem('UserInfo');
        this.user = JSON.parse(userInfo);
        var date = new Date();
        this.today.setHours(0, 0, 0, 0);
    }

    ngOnChanges(changes: {[propKey: string]: SimpleChange}){
        if(changes['timeoffs']) this.ngOnInit();
    }

    ////
    //@function sort newest
    //@desc sort list _timeoffs DESC day updated/created
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
            this.setShowPenddingDetails();
        }
    }

    ////
    //@function setShowPenddingDetails
    //@desc each timeoff show description when hander click action, so it initialized show is false
    //@param
    //@result void
    ////
    setShowPenddingDetails(){
        this.is_show_pending_details = new Map<Number, boolean>();
        this._timeoffs.forEach(timeoff => {
            this.is_show_pending_details.set(timeoff.id, false);
        })
    }

    ////
    //@function showDetails
    //@desc show description for timeoff
    //@param timeoff_id
    //@result void
    ////
    showDetails(timeoff_id: number){
        var cf = this.is_show_pending_details.get(timeoff_id);
        cf? $('#description-'+timeoff_id).css({'display': 'none'}) : $('#description-'+timeoff_id).css({'display': 'block'})
        this.is_show_pending_details.set(timeoff_id, !cf);
    }

    ////
    //@function show button edit and delete
    //@desc show button edit and control when mouseover
    //@param is_show = true ->  show , id -> using for get timeoff in list is_show_pending_details
    //@result void
    ////
    showTimeoffControl(is_show: boolean, id: number){
        is_show? $('#timeoff-control-'+id).css({'display': 'inline-block'}) : $('#timeoff-control-'+id).css({'display': 'none'});
    }

    ////
    //@function edit a timeoff
    //@desc navigate to edit timeoff page
    //@param using to pass to edit-timeoff pages
    //@result void
    ////
    edit(id: number){
        this.router.navigate(['/edit-timeoff/'+id]);
    }

    ////
    //@function delete
    //@desc delete a timeoff
    //@param id using to pass to serve
    //@result void
    ////
    delete(id: number){
        this.timeoffService.delete(id,)
        .then(
            (result) => {
                this.noticeMessage('Request deleted', true)
                this.reload.emit();
            },
            (error) => {
                this.noticeMessage(JSON.parse(error['_body']).error, false)
            }
        )
    }

    ////
    //@function update
    //@desc answer a timeoff request
    //@param id using to pass to serve
    //@result void
    ////
    update(id: number){
        this.timeoffService.update(id, this.timeOffPut).then(
            (result) => {
                this.noticeMessage('Request' + this.timeOffPut.answer_timeoff_request.status , true)
                this.reload.emit();
            },
            (error) => {
                this.noticeMessage(JSON.parse(error['_body']).error, false)
            }
        )
    }

    ////
    //@function showForm
    //@desc update button content when show Form answer
    //@param status
    //@result void
    ////
    showForm(status: string){
        this.timeOffPut.answer_timeoff_request.status = status;
    }

    // update current_page each time click page_button
    paginates(event) {
        this.current_page = event.page + 1;
        // this.changeIconPaginate();
        //event.first = Index of the first record
        //event.rows = Number of rows to display in new page
        //event.page = Index of the new page
        //event.pageCount = Total number of pages
    }

    // change forward anjd backforward icon
    changeIconPaginate(){
        $('#projects-paginate').css({'display': 'block'});
        $('.fa-forward').addClass('fa fa-angle-right');
        $('.fa-backward').addClass('fa fa-angle-left');
        $('.fa-step-forward').addClass('fa fa-angle-double-right fa-1');
        $('.fa-step-backward').addClass('fa fa-angle-double-left fa-1');
    }

    ////
    //@function noticeMessage
    //@desc show notice messages
    //@param content -> content messages, isSuccess -> show messages sucess or error
    //@result void
    ////
    noticeMessage(content: string, isSuccess){
        this.msgs = [];
        isSuccess?
            this.msgs.push({severity: 'success', summary: 'Success', detail: content}):
            this.msgs.push({severity: 'error', summary: 'Error Messages', detail: content});
    }
}
