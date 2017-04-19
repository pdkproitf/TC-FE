import { Message } from 'primeng/primeng';
import { UserService } from './../services/user-service';
import { Auth, AuthPost } from './../models/auth';
import { Router } from '@angular/router';
import { User } from './../models/user';
import { MenuItem } from 'primeng/primeng';
import { Component, OnInit, Input } from '@angular/core';
import { TimeoffService }           from '../services/timeoff-service';

@Component({
    selector: 'app-member-menu-bar',
    templateUrl: './member-menu-bar.component.html',
    styleUrls: ['./member-menu-bar.component.scss']
})
export class MemberMenuBarComponent implements OnInit {
    msgs: Message[] = [];
    items: MenuItem[];
    user: User = new User();
    auth: Auth = new Auth();
    authPost: AuthPost = new AuthPost();
    imageUrl: string;
    @Input()
    currentState: number = null;
    classActive: string[] = ['', '', '', '', ''];
    isAdmin: boolean = false;
    isPM: boolean = false;
    /** timeoff num of pending request */
    timeoffRequest: number = 0;
    timeoffBacground: string = ' ';

    constructor(private router: Router, private userService: UserService, private timeoffService: TimeoffService) { }

    ngOnInit() {
        if (this.currentState !== null) {
            this.classActive[this.currentState] = 'active';
        }
        let userInfo = localStorage.getItem('UserInfo');
        let userObj = JSON.parse(userInfo);
        // console.log(userObj);
        this.isAdmin = (userObj.role.name === 'Admin') ? true : false;
        this.isPM = this.isAdmin;
        if (!this.isPM) {
            this.isPM = (userObj.role.name === 'PM') ? true : false;
        }
        if (!this.isPM) {
            this.isPM = (userObj.pm_projects > 0);
        }
        this.user.name = userObj.user.first_name;
        this.imageUrl = userObj.user.image;
        this.items = [
            {label: 'Profile', icon: 'fa-user-circle', command: (event) => {
                this.router.navigate(['profile']);
            }},
            {label: 'Setting', icon: 'fa-cog', command: (event) => {
                this.router.navigate(['setting']);
            }},
            {label: 'Logout', icon: 'fa-sign-out', command: (event) => {
                this.logOut();
            }}
        ];
        this.showTimeoffRequest();
    }

    logOut(): void {
        let userInfo = localStorage.getItem('UserInfo');
        let userObj = JSON.parse(userInfo);
        console.log(userObj);
        this.auth.access_token = userObj.user.token;
        this.auth.client = userObj.user.client;
        this.auth.uid = userObj.user.uid;
        this.authPost.auth = this.auth;
        this.userService.logOut(this.authPost).then(
            (data) => {
                localStorage.removeItem('UserInfo');
                this.router.navigate(['/']);
                let content = 'Logged out';
                this.msgs = [];
                this.msgs.push({severity: 'success', summary: 'Success', detail: content});
            },
            (error) => {
                let content = JSON.parse(error['_body']).error;
                this.msgs = [];
                this.msgs.push({severity: 'error', summary: 'Error', detail: content});
            }
        );
    }

    updateInfo() {
        let userInfo = localStorage.getItem('UserInfo');
        let userObj = JSON.parse(userInfo);
        this.user.name = userObj.user.first_name;
        this.imageUrl = userObj.user.image;
    }

    showTimeoffRequest(){
        this.timeoffPendingRequest();
        if(this.currentState == 2) this.timeoffBacground += 'timeoff-bacground-yellow';
    }

    timeoffPendingRequest(){
        var this_year = new Date(new Date().getFullYear(), 0, 1);
        this.timeoffService.getNumTimeoffsPending(this_year,new Date()).then(
            (result) => {
                this.timeoffRequest = parseInt(result + '');
            },
            (error) => {
                // alert(error);
                console.log('error',error);
            }
        );
    }

    setActiveMenu(a) {
        let len = this.classActive.length;
        for (let i = 0; i < len; i++) {
            this.classActive[i] = '';
        }
        this.classActive[a] = 'active';
    }
}
