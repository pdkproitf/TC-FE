import { Validators, FormBuilder, FormControl } from '@angular/forms';
import { TimeOff, TimeOffPost } from './../models/timeoff';
import { Component, OnInit }    from '@angular/core';
import { CalendarModule }       from 'primeng/primeng';
import { TimeoffService }       from '../services/timeoff-service';
import { Router }               from '@angular/router'
declare var $:any;

@Component({
    selector: 'app-create-timeoff',
    templateUrl: './create-timeoff.component.html',
    styleUrls: ['./create-timeoff.component.scss']
})
export class CreateTimeoffComponent implements OnInit {

    constructor(private router: Router, public fb: FormBuilder, private timeoffService: TimeoffService) { }
    is_start_half_day: string = 'false';
    is_end_half_day: string = 'false';
    start_date = "";
    end_date = "";
    minDateValue = new Date();
    ngOnInit() {
    }

    public timeoffForm = this.fb.group({
        start_date: [null, Validators.required],
        end_date: [null, Validators.required],
        is_start_half_day: ['false', Validators.required],
        is_end_half_day: ["false", Validators.required],
        description: ['', Validators.required],
    });

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
        console.log(event);
        console.log(this.timeoffForm.value);
        this.timeoffService.createTimeOff(this.getTimePost())
        .then(
            (result) => {
                console.log('timeoff result', result);
                this.cancel();
            },
            (errors) => {
                alert(errors.json().error);
                console.log('timeoff error', errors.json().error);
            })
        }

        cancel(){
            this.router.navigate(['/timeoffs']);
        }

        getTimePost(): TimeOffPost{
            var timeoff = new TimeOff();
            timeoff.start_date = this.timeoffForm.value['start_date']
            timeoff.end_date = this.timeoffForm.value['end_date']
            timeoff.is_start_half_day = this.timeoffForm.value['is_start_half_day']
            timeoff.is_end_half_day = this.timeoffForm.value['is_end_half_day']
            timeoff.description = this.timeoffForm.value['description']
            return new TimeOffPost(timeoff);
        }
    }
