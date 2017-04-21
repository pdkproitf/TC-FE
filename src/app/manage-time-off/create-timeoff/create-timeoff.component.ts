import { TimeOff, TimeOffPost, PersonNumTimeOff }   from '../../models/timeoff';
import { Validators, FormBuilder, FormControl }     from '@angular/forms';
import { Component, OnInit }    from '@angular/core';
import { CalendarModule }       from 'primeng/primeng';
import { TimeoffService }       from '../../services/timeoff-service';
import { ActivatedRoute }       from '@angular/router';
import { Message }              from 'primeng/primeng';
import { Router }               from '@angular/router';

declare var $:any;

@Component({
    selector: 'app-create-timeoff',
    templateUrl: './create-timeoff.component.html',
    styleUrls: ['./create-timeoff.component.scss']
})
export class CreateTimeoffComponent implements OnInit {
    action = 'Send';
    minDateValue = new Date();
    /** if this component using for edit action -> id will be updated */
    id = 0;
    personNumTimeOff: PersonNumTimeOff = new PersonNumTimeOff();

    msgs: Message[] = [];

    constructor(private route: ActivatedRoute, private router: Router, public fb: FormBuilder, private timeoffService: TimeoffService) {}

    public timeoffForm = this.fb.group({
        start_date: [null, Validators.required],
        end_date: [null, Validators.required],
        is_start_half_day: ["false", Validators.required],
        is_end_half_day: ["false", Validators.required],
        description: [null, Validators.required],
    });

    ngOnInit() {
        let para_id = this.route.snapshot.params['id']
        if(para_id){
            this.action = 'Update';
            this.getTimeOff(para_id);
            this.id = para_id;
        }
        this.getPersonNumTimeOff();
    }

    getPersonNumTimeOff(){
        this.timeoffService.getPersonNumTimeOff().then(
            (result) => {
                this.personNumTimeOff = result;
            },
            (error) => {
                this.noticeMessage(JSON.parse(error['_body']).error);
            }
        )
    }

    setAutoEndDay(){
        if(this.timeoffForm.value['start_date']){
            this.minDateValue = this.timeoffForm.value['start_date'];

            if(!this.timeoffForm.value['end_date']){
                (<FormControl> this.timeoffForm.controls['end_date']).setValue(this.timeoffForm.value['start_date']);
            }else if(this.timeoffForm.value['end_date'] < this.timeoffForm.value['start_date']){
                (<FormControl> this.timeoffForm.controls['end_date']).setValue(this.timeoffForm.value['start_date']);
            }
            this.setShowChoiceTypeEndDay();
        }
    }

    setShowChoiceTypeEndDay(){
        if(this.timeoffForm.value['end_date'] > this.timeoffForm.value['start_date']){
            $('#choice-type-end-day').css({'display': 'block'});
        }else{
            $('#choice-type-end-day').css({'display': 'none'});
        }

        if(this.isWeekend(this.timeoffForm.value['start_date'], this.timeoffForm.value['end_date']))
            this.noticeMessage('Your dayoff constraint weekend, please make sure the inform is corect', false);

    }

    submit(event) {
        if(!this.timeoffForm.valid){
            this.noticeMessage(this.timeoffForm.status +' Please fill in all field');
            return;
        }

        (this.action == 'Send')?
        this.timeoffService.createTimeOff(this.convertToTimeOffPost())
        .then(
            (result) => {
                this.cancel();
            },
            (error) => {
                this.noticeMessage(JSON.parse(error['_body']).error);
            }
        )
        :
        this.timeoffService.update(this.id, this.convertToTimeOffPost())
        .then(
            (result) => {
                this.cancel();
            },
            (error) => {
                this.noticeMessage(JSON.parse(error['_body']).error);
            }
        )
    }

    cancel(){
        this.router.navigate(['/timeoffs']);
    }

    convertToTimeOffPost(): TimeOffPost{
        var timeoff = new TimeOff();
        timeoff.start_date = this.timeoffForm.value['start_date']
        timeoff.end_date = this.timeoffForm.value['end_date']
        timeoff.is_start_half_day = this.timeoffForm.value['is_start_half_day']
        timeoff.is_end_half_day = this.timeoffForm.value['is_end_half_day']
        timeoff.description = this.timeoffForm.value['description']

        return new TimeOffPost(timeoff);
    }

    // ****************** Edit TimeOff**********************************************
    getTimeOff(id: number){
        this.timeoffService.getTimeOff(id).then(
            (result) => {
                this.initValueEdit(result);
                this.removeMindate(result);
            },
            (error) =>  {
                this.noticeMessage(JSON.parse(error['_body']).error);
            }
        )
    }

    removeMindate(timeoff: TimeOff){
        let userInfo = localStorage.getItem('UserInfo');
        var member = JSON.parse(userInfo);
        if((member.role.name == 'Admin' || member.role.name == 'PM') && (timeoff.sender_id != member.id)){
            this.minDateValue = null;
        }
    }

    initValueEdit(timeoff: TimeOff){
        (<FormControl> this.timeoffForm.controls['start_date']).setValue(new Date(timeoff.start_date));
        (<FormControl> this.timeoffForm.controls['end_date']).setValue(new Date(timeoff.end_date));
        (<FormControl> this.timeoffForm.controls['is_start_half_day']).setValue(timeoff.is_start_half_day+'');
        (<FormControl> this.timeoffForm.controls['is_end_half_day']).setValue(timeoff.is_end_half_day+'');
        (<FormControl> this.timeoffForm.controls['description']).setValue(timeoff.description);

        this.setShowChoiceTypeEndDay();
    }

    noticeMessage(content: string, is_error: boolean = true){
        this.msgs = [];
        is_error?
            this.msgs.push({severity: 'error', summary: 'Error Messages', detail: content}) :
            this.msgs.push({severity: 'warn', summary: 'Warn Message', detail: content})
    }

    isWeekend(date1, date2) {
        var d1 = new Date(date1),
        d2 = new Date(date2),
        isWeekend = false;

        while (d1 <= d2) {
            var day = d1.getDay();
            isWeekend = (day === 6) || (day === 0);
            if (isWeekend) { return true; } // return immediately if weekend found
            d1.setDate(d1.getDate() + 1);
        }
        return false;
    }
}
