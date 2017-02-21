import { Validators, FormBuilder, FormControl } from '@angular/forms';
import { Component, OnInit }    from '@angular/core';
import { CalendarModule }       from 'primeng/primeng';
import { Router }               from '@angular/router'
declare var $:any;

@Component({
    selector: 'app-create-timeoff',
    templateUrl: './create-timeoff.component.html',
    styleUrls: ['./create-timeoff.component.scss']
})
export class CreateTimeoffComponent implements OnInit {

    constructor(private router: Router, public fb: FormBuilder) { }
    is_start_half_day: string = 'false';
    is_end_half_day: string = 'false';
    date_start = "";
    date_end = "";
    minDateValue = new Date();
    ngOnInit() {
    }

    public timeoffForm = this.fb.group({
        date_start: [this.minDateValue, Validators.required],
        date_end: [null, Validators.required],
        is_start_half_day: ['false', Validators.required],
        is_end_half_day: ["false", Validators.required],
        description: ['', Validators.required],
    });

    setAutoEndDay(){
        if(this.timeoffForm.value['date_start']){
            this.minDateValue = this.timeoffForm.value['date_start'];

            if(!this.timeoffForm.value['date_end']){
                (<FormControl> this.timeoffForm.controls['date_end']).setValue(this.timeoffForm.value['date_start']);
                $('#choice-type-end-day').css({'display': 'block'});
            }else if(this.timeoffForm.value['date_end'] < this.timeoffForm.value['date_start']){
                (<FormControl> this.timeoffForm.controls['date_end']).setValue(this.timeoffForm.value['date_start']);
            }
        }
    }

    submit(event) {
        console.log(event);
        console.log(this.timeoffForm.value);
    }

    cancel(){
        this.router.navigate(['/timeoffs']);
    }
}
