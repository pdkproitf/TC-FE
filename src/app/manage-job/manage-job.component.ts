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
    /** data get from api */
    members: Member[];
    jobs: Job[];

    /** current data to show */
    _members: Member[];
    _jobs: Job[];

    msgs: Message[] = [];

    member_drag: number = 0;
    job_drag_member: number = 0;
    job_drop_member: number = 0;

    dialogVisible: boolean = false;

    classImageSearch = 'fa fa-search imgspan';
    searchJobParten = '';

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
                this._jobs = result;
                this.jobs = result;
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
                this._members = result;
            },
            (error) => {
                this.noticeMessage(JSON.parse(error['_body']).error);
            }
        )
    }

    // get job from list job
    getJob(id: number){
        return this.jobs.find(x => x.id == id);
    }

    // get member from list member
    getMember(id: number){
        return this.members.find(x => x.id == id);
    }

    // get list member constraint job_id
    getJobMembers(job_id: number){
        var list = [];
        for (let member of this.members)
        if(member.jobs.findIndex(x => x.id == job_id) != -1)
        list.push(member);
        return list;
    }

    showControl(show: boolean, job: Job){
        show? $('#job-' + job.id).css({'display': 'inline-flex'}) : $('#job-' + job.id).css({'display': 'none'});
    }

    searchJob(){
        this._jobs = [];
        for (let job of this.jobs) {
            if ((job.name.toUpperCase().indexOf(this.searchJobParten.toUpperCase()) > -1) ||
                (job.name.toLowerCase() .indexOf(this.searchJobParten.toLowerCase()) > -1)) {
                this._jobs.push(job);
            }
        }
    }

    /** ****** drag member in company members ******************************* */
    dragStart(event, member_id: number) {
        this.member_drag = member_id;
    }

    drop(event, job_id: number) {
        var job = this.jobs.find(x => x.id == job_id);
        var member = this.getMember(this.member_drag);
        if(!member){
            this.noticeMessage('Member Not Found!');
            return;
        }

        if(member.jobs.find(x => x.id == job_id)){
            this.noticeMessage('Member already exist!', 1);
        }else{
            this.addJobToMember(member, job_id);
        }
    }

    dragEnd(event) {
        this.member_drag = 0;
    }
    /** ****** end drag member in company members *************************** */

    /** ****** drag member in job members *********************************** */
    jobDragStart(event, member_id: number, job_id: number) {
        this.member_drag = member_id;
        this.job_drag_member = job_id;
    }

    jobDragEnd(event) {
        if((this.job_drag_member != this.job_drop_member) && this.job_drag_member != 0){
            var member = this.getMember(this.member_drag)
            !member && this.noticeMessage('Member Not Found!');

            if(member.jobs.findIndex(x => x.id == this.job_drop_member) != -1){
                this.noticeMessage('Member already exist!', 1);
            }else{
                this.removeJobFromMember(member, this.job_drag_member);
                this.job_drop_member && this.addJobToMember(member , this.job_drop_member);
            }
        }
        this.job_drag_member = 0;
        this.member_drag = 0;
        this.job_drop_member = 0;
    }

    jobDrop(event, job_id: number) {
        this.job_drop_member = job_id;
    }
    /** ****** end drag member in job members ******************************* */

    addJobToMember(member: Member, job_id: number){
        var job = this.getJob(job_id);
        if(job){
            if(member.jobs.findIndex(x => x.id == job.id) != -1){
                this.noticeMessage('Member already exist!', 1);
            }else{
                member.jobs.push(job);
                this.updateMember(member);
            }
        }
    }

    removeJobFromMember(member: Member, job_id: number){
        var jobs = member.jobs;
        var index = jobs.findIndex(x => x.id == job_id);
        if(index != -1){
            jobs.splice(index, 1);
            member.jobs = jobs;
            this.updateMember(member)
        }
    }

    updateMember(member: Member) {
        let jobs = [];
        for (let job of member.jobs) {
            jobs.push(job.id);
        }
        let mem = {
            members: {
                role_id: member.role.id,
                jobs: jobs
            }
        };

        this.membershipService.editMember(member.id, mem).then(
            (result) => {
                for (let i in this.members)
                    if(this.members[i].id == result.id){
                        this.members[i] = result;
                        this.noticeMessage('Success!', 0);
                        break;
                    }
            },
            (error) => {
                this.noticeMessage(JSON.parse(error['_body']).error);
            }
        )
    }

    save(job: Job, job_name: string){
        let job_update = {
            job:{
                name: job_name
            }
        };
        this.jobService.updateJob(job.id, job_update).then(
            (result) => {
                for (let i in this.jobs)
                    if(this.jobs[i].id == job.id){
                        this.jobs[i].name = result.name;
                        this.noticeMessage('Success!', 0);
                    }
            },
            (error) => {
                this.noticeMessage(JSON.parse(error['_body']).error);
            }
        )
    }

    delete(job: Job){
        this.jobService.delete(job.id).then(
            (result) => {
                var index = this.jobs.findIndex(x => x.id == job.id)
                if(index != -1){
                    this.jobs.splice(index, 1);
                    this.noticeMessage('Success!', 0);
                }
            },
            (error) => {
                this.noticeMessage(JSON.parse(error['_body']).error);
            }
        )
    }

    showDialog(show: boolean){
        this.dialogVisible = show;
    }

    createJob(name: string){
        let jobPost = {
            job: {
              name: name
            }
          };

        this.jobService.addNewJob(jobPost).then(
            (result) => {
                var index = this.jobs.push(result);
                this.showDialog(false);
                this.noticeMessage('Success!', 0);
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
