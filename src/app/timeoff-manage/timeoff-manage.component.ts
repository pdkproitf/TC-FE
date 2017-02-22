import { Component, OnInit }    from '@angular/core';
import { Router }               from '@angular/router'

@Component({
    selector: 'app-timeoff-manage',
    templateUrl: './timeoff-manage.component.html',
    styleUrls: ['./timeoff-manage.component.scss']
})
export class TimeoffManageComponent implements OnInit {

    constructor(private router: Router) { }

    ngOnInit() {
    }

    createTimeOff(){
        this.router.navigate(['/new-timeoff']);
    }
}
