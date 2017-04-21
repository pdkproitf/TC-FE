import { Component, OnInit, Input, OnChanges, SimpleChange, EventEmitter, Output } from '@angular/core';
import { TimeOff, PersonNumTimeOff, TimeOffAnswer }    from '../../models/timeoff';
import { TimeoffService }               from '../../services/timeoff-service';
import { ProjectDefault }               from '../../models/project';
import { Holiday }                      from '../../models/holiday';
import { Message }                      from 'primeng/primeng';
import { Member }                       from '../../models/member';
import { Router }                       from '@angular/router';
import { Job }                          from '../../models/job';
declare var $ :any;

@Component({
    selector: 'app-timeoff-table-view',
    templateUrl: './timeoff-table-view.component.html',
    styleUrls: ['./timeoff-table-view.component.scss']
})
export class TimeoffTableViewComponent implements OnInit, OnChanges {
    days :Date[] = [];
    selectedValues: Number[] = [];
    selectedProject: number = 0;
    selectedJob: number = 0;
    searchPattern = '';
    start_date: Date;
    end_date: Date;

    // constraint list timeoffs of each member
    hash_timeoff: Map<Number, Array<TimeOff>>;
    // hash constraint member_id and day to get class for table cel
    hash_member_day_status: Map<string, string>;
    // using for dropdown projects type
    projects_types: Array<ProjectDefault>;
    // using for dropdown roles type
    jobs_types: Array<Job>;

    distionary_member: Array<Member>;
    list_members: Array<Member>;

    holidays: Array<Holiday>;

    // using for init dialog's data
    dialog_timeoff :TimeOff = new TimeOff();
    dialog_personNumTimeOff :PersonNumTimeOff = new PersonNumTimeOff();
    user: Member ;
    is_ableToModify :boolean = false;
    is_ableToAnswer :boolean = false;
    timeOffPut :TimeOffAnswer = new TimeOffAnswer();
    dropdown_selected = 0;

    /** show nitification */
    msgs: Message[] = [];

    @Input()
    set startDay(date: Date){
        date.setHours(0,0,0,0);
        this.start_date = date;
    }
    @Input()
    set endDay(date: Date){
        date.setHours(0,0,0,0);
        this.end_date = date;
    }

    @Input()
    set projectId(id: number){
        this.selectedProject = id;
        this.initializeValuesFollowTypes();
    }

    @Input()
    set jobId(id: number){
        this.selectedJob = id;
        this.initializeValuesFollowTypes();
    }

    @Output() setWeeks = new EventEmitter<Date>();
    @Output() initProjecttypes = new EventEmitter<Array<ProjectDefault>>();
    @Output() initJobtypes = new EventEmitter<Array<Job>>();
    @Output() reloadCalendar = new EventEmitter();

    constructor(private timeoffService :TimeoffService, private route :Router) {}

    ngOnInit() {
        this.days = [];
        var current_day ;
        for(var i = 0; i < 15; i++){
            current_day = new Date();
            current_day.setTime(this.start_date.getTime());
            current_day.setDate(this.start_date.getDate() + i);
            current_day = new Date(current_day.getFullYear(), current_day.getMonth(), current_day.getDate());
            this.days.push(current_day);
        }

        this.hash_timeoff = new Map<Number, Array<TimeOff>>();
        this.hash_member_day_status  = new Map<string, string>();
        this.distionary_member  = [];
        this.list_members  = [];
        this.holidays  = [];
        this.projects_types = [];
        this.jobs_types = [];

        this.getTimeOff();

        let userInfo = localStorage.getItem('UserInfo');
        this.user = JSON.parse(userInfo);
    }

    ngOnChanges(changes: {[propKey: string]: SimpleChange}){
        if(changes['startDay'] || changes['endDay']) this.ngOnInit();
    }

    ////
    //@function get timeoff
    //@desc get timeoff from API and init values for variable
    //@param
    //@result
    ////
    getTimeOff(){
        this.timeoffService.getPhaseTimeOffsMemberOrdinal(this.start_date, this.end_date).then(
            (result) => {
                this.distionary_member = result.members;
                this.holidays = result.holidays;
                for(var i = 0; i < result.timeoffs.length; i++)
                    this.hash_timeoff.set(result.members[i].id, result.timeoffs[i]);

                (this.selectedValues.length > 0)? this.initializeSelectedValues():
                    (this.searchPattern.length > 0)? this.initializeSearchValues():this.initializeAllValues();
                this.initializeHashMemberDayStatus();
            },
            (error) => {
                this.noticeMessage(JSON.parse(error['_body']).error, false)
            }
        )
    }

    ////
    //@function init list_member values
    //@desc set list_member all values get from API
    //@param
    //@result
    ////
    initializeAllValues(){
        this.list_members = this.distionary_member;
    }

    ////
    //@function init list_member values
    //@desc set list_member values selected
    //@param
    //@result
    ////
    initializeSelectedValues(){
        this.list_members = [];
        for(var i = 0; i < this.selectedValues.length; i ++)
            for(var j = 0; j < this.distionary_member.length; j++)
                if(this.distionary_member[j].id == this.selectedValues[i]){
                    this.list_members.push(this.distionary_member[j]);
                    break;
                }
    }

    ////
    //@function init list_member values
    //@desc set list_member values follow types
    //@param
    //@result
    ////
    initializeValuesFollowTypes(){
        this.list_members = [];
        if((this.selectedProject == 0) && (this.selectedJob == 0)) return this.list_members = this.distionary_member;
        for (var member of this.distionary_member){
            if(this.selectedProject == 0){
                if(member.jobs.findIndex(x => x.id == this.selectedJob) != -1)
                    this.list_members.push(member);
            }
            else if( this.selectedJob == 0 ){
                    if((member['projects_joined'].findIndex(x => x.id == this.selectedProject) != -1))
                        this.list_members.push(member);
            }
            else{
                if((member.jobs.findIndex(x => x.id == this.selectedJob) != -1) && (member['projects_joined'].findIndex(x => x.id == this.selectedProject) != -1))
                    this.list_members.push(member);
            }
        }
    }

    ////
    //@function init list_member values
    //@desc set list_member values searched
    //@param
    //@result
    ////
    initializeSearchValues(){
        this.distionary_member.forEach((member) =>{
            var name = member.user.first_name + ' '+ member.user.last_name;
            if ((name.toUpperCase().indexOf(this.searchPattern.toUpperCase()) > -1) || (name.toLowerCase().indexOf(this.searchPattern.toLowerCase()) > -1)) {
                this.list_members.push(member);
            }
        })
    }

    ////
    //@function init initializeHashMemberDayStatus
    //@desc set values initializeHashMemberDayStatus
    //@param
    //@result
    ///
    initializeHashMemberDayStatus(){
        this.hash_member_day_status = new Map<string, string>();
        for (let member of this.distionary_member){
            this.pushToListProjects(member);
            this.pushToListJobs(member);
            for(let day of this.days)
                this.hash_member_day_status.set(member.id+'-'+day.getDate(), this.computeClassDayCel(day, member.id));
        }
        this.initProjecttypes.emit(this.projects_types);
        this.initJobtypes.emit(this.jobs_types);
    }

    pushToListProjects(member: Member){
        if(member['projects_joined'])
            for (var project of member['projects_joined'])
                if(this.projects_types.findIndex(x => x.id === project.id) == -1)
                    this.projects_types.push(project);
    }

    pushToListJobs(member: Member){
        for (var job of member.jobs)
            if(this.jobs_types.findIndex(x => x.id === job.id) == -1)
                this.jobs_types.push(job);
    }

    ////
    //@function computeClassDayCel
    //@desc set status for each day in table
    //@param _day -> day set, id -> member_id to get list member's timeoff
    //@result
    ///
    computeClassDayCel(_day: Date, id: number){
        var status = "cel-";
        if(this.isHoliday(_day)) return 'cel-holiday';

        var day = _day.getTime();
        for (let timeoff of this.hash_timeoff.get(id)) {
            var start_date = new Date(timeoff.start_date.toString());
            var end_date = new Date(timeoff.end_date.toString());

            start_date.setHours(0,0,0,0);
            end_date.setHours(0,0,0,0);

            if(start_date <= _day && _day <= end_date && timeoff.status != 'rejected'){
                status += timeoff.status;
                return status;
            }
        }
        if(this.isWeekend(_day)) return 'cel-weekend';
        return status;
    }

    isHoliday(day: Date){
        for (var holiday of this.holidays){
            var start_date = new Date(holiday.begin_date.toString());
            var end_date = new Date(holiday.end_date.toString());

            start_date.setHours(0,0,0,0);
            end_date.setHours(0,0,0,0);
            if(day >= start_date && day <= end_date)
                return true;
        }
        return false;
    }

    isWeekend(day: Date){
        return (day.getDay()%6 == 0)
    }

    ////
    //@function ableToShowModify
    //@desc check a cel in table, to show dialog modify
    //@param string -> status of cel
    //@result true/false
    ///
    ableToShowModify(string: string){
        var status = this.hash_member_day_status.get(string);
        if(status == 'cel-pending' || status == 'cel-approved')
            return true;
        return false;
    }


    getmemberStatus(id: number){
        for (var day of this.days){
            var status = this.hash_member_day_status.get(id+'-'+day.getDate());
            if(status == 'cel-pending' || status == 'cel-approved')
                return status.slice(4, status.length);
        }
        return '';
    }

    ////
    //@function checked
    //@desc if member was checked then hide/show dialog "selected"
    //@param
    //@result
    ///
    checked() {
        if(this.selectedValues.length > 0){
            $('.messages').css({'display': 'block'});
        }else{
            $('.messages').css({'display': 'none'});
            this.hidenMessage();
        }
    }

    hidenMessage(){
        $('.messages').find('.action').css({'display': 'block'});
        $('.messages').find('.clear').css({'display': 'none'});
        $('.messages').css({'display': 'none'});
        this.searchPattern = '';
        this.selectedValues = [];
        this.list_members = this.distionary_member;
    }

    showSelected(){
        $('.messages').find('.action').css({'display': 'none'});
        $('.messages').find('.clear').css({'display': 'block'});
        this.initializeSelectedValues();
    }

    ////
    //@function search
    //@desc hander typing to search text area and init values for list_member
    //@param
    //@result
    ///
    search(){
        this.list_members = [];
        this.initializeSearchValues();
    }

    ////
    //@function goToFutureDayOff
    //@desc show nearest futuerday off in table
    //@param date -> the day nearest
    //@result
    ///
    goToFutureDayOff(date: Date){
        this.setWeeks.emit(new Date(date));
    }

    ////
    //@function initDialog
    //@desc init data when show dialog
    //@param date -> the day nearest
    //@result
    ///
    initDialog(member_id :number, _day :Date){
        this.hash_timeoff.get(member_id)
        for (let timeoff of this.hash_timeoff.get(member_id)) {
            var start_date = new Date(timeoff.start_date.toString());
            var end_date = new Date(timeoff.end_date.toString());

            start_date.setHours(0,0,0,0);
            end_date.setHours(0,0,0,0);

            if(start_date <= _day && _day <= end_date){
                this.dialog_timeoff = timeoff;
                this.timeOffPut.answer_timeoff_request.status = 'approved';
                this.is_ableToModify =  this.ableToModify(member_id);
                this.is_ableToAnswer =  this.ableToAnswer(member_id);
                this.getNumOfPersonTimeOff(member_id, timeoff.id)
            }
        }
        this.resetDialogContent();
    }

    getNumOfPersonTimeOff(member_id :number, id: number){
        this.timeoffService.getPersonNumTimeOff(id).then(
            (result) => {
                this.dialog_personNumTimeOff = result;
            },
            (error) => {
                this.noticeMessage(JSON.parse(error['_body']).error, false)
            }
        )
    }

    ableToModify(member_id: number){
        if(this.user.role.name == 'Admin' || (this.user.role.name == 'PM' && timeoff_member.role.name == 'Member')) return true;
        if(!this.checkOverDayToModify()){
            return (this.dialog_timeoff.status == 'pending');
        }
        //check role
        if(this.user.role.name == 'Member') return false;
        if(this.user.id == member_id) return true;

        var timeoff_member = this.distionary_member.find(x => x.id === member_id);
        return false;
    }

    ableToAnswer(member_id: number){
        if(!this.checkOverDayToModify()) return false;
        //check role
        if(this.user.role.name == 'Member') return false;
        if(this.user.id == member_id) return false;

        var timeoff_member = this.distionary_member.find(x => x.id === member_id);
        if(this.user.role.name == 'PM' && (timeoff_member.role.name == 'PM' || timeoff_member.role.name == 'Admin'))
            return false;
        return true;
    }

    checkOverDayToModify(){
        //check day
        var create = new Date(this.dialog_timeoff.created_at); create.setHours(0, 0, 0, 0)

        var start_date = new Date(this.dialog_timeoff.start_date); start_date.setHours(0, 0, 0, 0)

        var this_year = new Date(new Date().getFullYear(), 0, 1);
        var today = new Date(); today.setHours(0, 0, 0, 0);
        if((create < this_year) || (start_date < today)) return false;
        return true;
    }

    resetDialogContent(){
        console.log('vo day', this.dialog_timeoff.status)
        if(this.dialog_timeoff.status == 'approved'){
            $('.buttons').hide();
            $('.drop-down').show();
            this.timeOffPut.answer_timeoff_request.approver_messages = this.dialog_timeoff.approver_messages;
            this.timeOffPut.answer_timeoff_request.status = this.dialog_timeoff.status;
        }else{
            $('.drop-down').hide();
            $('.reject').show().prop('disabled', !this.is_ableToAnswer);
            $('.modify').show();
            $('.buttons').show();
            $('.buttons').css({'display': 'block'})
        }
        $('.cancel').hide();
        $('.form-group').css({'display': 'none'});
    }

    showDialogContent(button_name :string){
        if(button_name == 'Reject') this.timeOffPut.answer_timeoff_request.status = 'rejected';

        $('.form-group').css({'display': 'flex'});
        $('.approve').addClass('approve-send')
            .text(button_name+' & Send').prop('type', 'submit');
        $('.reject').hide();
        $('.cancel').show();
        $('.modify').hide();
    }

    edit(){
        this.route.navigate(['/edit-timeoff', this.dialog_timeoff.id]);
    }

    delete(){
        this.timeoffService.delete(this.dialog_timeoff.id,)
        .then(
            (result) => {
                this.noticeMessage('Delete ' + result['status'] , true)
                this.reload();
            },
            (error) => {
                this.noticeMessage(JSON.parse(error['_body']).error, false)
            }
        )
    }

    answerTimeoff(){
        if(this.dialog_timeoff.status == 'approved')
            this.timeOffPut.answer_timeoff_request.status = (this.dropdown_selected == 0) ?  'approved' : 'rejected';
        this.timeoffService.update(this.dialog_timeoff.id, this.timeOffPut).then(
            (result) => {
                this.noticeMessage('Request ' + this.timeOffPut.answer_timeoff_request.status , true)
                this.reload();
            },
            (error) => {
                this.noticeMessage(JSON.parse(error['_body']).error, false)
            }
        )
    }

    ////
    //@function reload
    //@desc reload component and emit parent reload
    //@param date -> the day nearest
    //@result
    ///
    reload(){
        this.ngOnInit();
        this.reloadCalendar.emit();
    }

    ////
    //@function noticeMessage
    //@desc show notice messages
    //@param content -> content messages, isSuccess -> show messages sucess or error
    //@result
    ////
    noticeMessage(content: string, isSuccess){
        this.msgs = [];
        isSuccess?
            this.msgs.push({severity: 'success', summary: 'Success', detail: content}):
            this.msgs.push({severity: 'error', summary: 'Error Messages', detail: content});
    }
}
