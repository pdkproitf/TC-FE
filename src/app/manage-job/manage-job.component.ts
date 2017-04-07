import { MembershipService }    from './../services/membership-service';
import { Component, OnInit }    from '@angular/core';
import { JobService }           from './../services/job-service';
import { Message }              from 'primeng/primeng';
import { Member }               from '../models/member';
import { Job }                  from '../models/job';
declare var $:any

@Component({
    selector: 'app-manage-job',
    templateUrl: './manage-job.component.html',
    styleUrls: ['./manage-job.component.scss']
})
export class ManageJobComponent implements OnInit {
    members: Member[];
    jobs: Job[];
    msgs: Message[] = [];

    member_drag: number = 0;
    job_drag_member: number = 0;
    job_drop_member: number = 0;

    dialogVisible: boolean = false;

    /** using trap job_member drop in job area */

    constructor(private membershipService: MembershipService, private jobService: JobService) {
        this.members = [];
        this.jobs = [];
        this.getJobs();
        this.getMembers();
    }

    ngOnInit() {
        this.getJobs();
        this.getMembers();
    }

    getJobs(){
        this.jobService.getAllJobs().then(
            (result) => {
                this.jobs = result;
                console.log('get job', result);
            },
            (error) => {
                this.noticeMessage(JSON.parse(error['_body']).error);
            }
        )
    }

    getMembers(){
        this.membershipService.getAllMembership().then(
            (result) => {
                this.members = result;
            },
            (error) => {
                this.noticeMessage(JSON.parse(error['_body']).error);
            }
        )
    }

    

    // status = 0 -> success, 1 -> warning, 2 -> error
    noticeMessage(content: string, status: number = 2){
        this.msgs = [];
        switch(status){
            case 0:{
                this.msgs.push({severity: 'success', summary: 'Success Message', detail: content});
                break;
            };
            case 1:{
                this.msgs.push({severity: 'warn', summary: 'Warning Message', detail: content});
                break;
            };
            case 2:{
                this.msgs.push({severity: 'error', summary: 'Error Messages', detail: content});
            }
        }
    }
}
