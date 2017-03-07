import { Validators, FormBuilder, FormControl }     from '@angular/forms';
import { TimeOff, TimeOffPost } from './../models/timeoff';
import { Component, OnInit }    from '@angular/core';
import { CalendarModule }       from 'primeng/primeng';
import { TimeoffService }       from '../services/timeoff-service';
import { ActivatedRoute }       from '@angular/router';
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
    today = new Date();
    id = 0;

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
    }

    submit(event) {
        (this.action == 'Send')?
        this.timeoffService.createTimeOff(this.convertToTimeOffPost())
        .then(
            (result) => {
                console.log('timeoff create', result);
                this.cancel();
            },
            (errors) => {
                alert(errors.json().error);
                console.log('timeoff error', errors.json().error);
            }
        )
        :
        this.timeoffService.updateTimeOff(this.id, this.convertToTimeOffPost())
        .then(
            (result) => {
                console.log('timeoff update', result);
                this.cancel();
            },
            (errors) => {
                alert(errors.json().error);
                console.log('timeoff error', errors.json().error);
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
                console.log('result timeoff ', result);
                this.initValueEdit(result);
            },
            (error) =>  {
                alert(error);
            }
        )
    }

    initValueEdit(timeoff: TimeOff){
        (<FormControl> this.timeoffForm.controls['start_date']).setValue(new Date(timeoff.start_date));
        (<FormControl> this.timeoffForm.controls['end_date']).setValue(new Date(timeoff.end_date));
        (<FormControl> this.timeoffForm.controls['is_start_half_day']).setValue(timeoff.is_start_half_day+'');
        (<FormControl> this.timeoffForm.controls['is_end_half_day']).setValue(timeoff.is_end_half_day+'');
        (<FormControl> this.timeoffForm.controls['description']).setValue(timeoff.description);

        this.setShowChoiceTypeEndDay();
    }
}
