import { AuthenAdmin } from './services/authen-admin';
import { SettingComponent } from './setting/setting.component';
import { InvitesConfirmComponent } from './invites-confirm/invites-confirm.component';
import { ProfileComponent } from './profile/profile.component';
import { ReportDetailProjectComponent } from './report-detail-project/report-detail-project.component';
import { ReportDetailComponent } from './report-detail/report-detail.component';
import { ReportComponent } from './report/report.component';
import { MembersConfirmComponent } from './members-confirm/members-confirm.component';
import { EditProjectComponent } from './edit-project/edit-project.component';
import { ManageMemberComponent } from './manage-member/manage-member.component';
import { CreateProjectComponent } from './create-project/create-project.component';
import { ProjectManageComponent } from './project-manage/project-manage.component';
import { VerifyEmailPageComponent } from './verify-email-page/verify-email-page.component';
import { NotLoggedIn } from './services/not-logged-in';
import { AuthenLoggedIn } from './services/authen-logged-in';
import { MarketingPageComponent } from './marketing-page/marketing-page.component';
import { DashboardComponent } from './dashboard/dashboard.component';
import { SignInComponent } from './sign-in/sign-in.component';
import { AppComponent } from './app.component';
import { SignUpComponent } from './sign-up/sign-up.component';
import { NgModule }             from '@angular/core';
import { RouterModule, Routes } from '@angular/router';
import { ProjectDetailsComponent } from './project-details/project-details.component';
import { TimeoffManageComponent } from './timeoff-manage/timeoff-manage.component';
import { CreateTimeoffComponent } from './create-timeoff/create-timeoff.component';
import { TimeoffPassRequestsComponent } from './timeoff-pass-requests/timeoff-pass-requests.component';
import { ReportDetailsAdvancesComponent } from './report-details-advances/report-details-advances.component';
const routes: Routes = [
    { path: 'sign-up', component: SignUpComponent, canActivate: [NotLoggedIn] },
    { path: 'sign-up/:token/:companyName/:companyDomain', component: SignUpComponent, canActivate: [NotLoggedIn] },
    { path: 'sign-in', component: SignInComponent, canActivate: [NotLoggedIn] },
    { path: 'sign-in/:companyDomain', component: SignInComponent, canActivate: [NotLoggedIn] },
    { path: 'dashboard', component: DashboardComponent, canActivate: [AuthenLoggedIn] },
    { path: '', component: MarketingPageComponent, canActivate: [NotLoggedIn] },
    { path: 'verify-email/:text', component: VerifyEmailPageComponent, canActivate: [NotLoggedIn] },
    { path: 'projects', component: ProjectManageComponent, canActivate: [AuthenLoggedIn] },
    { path: 'new-project', component: CreateProjectComponent, canActivate: [AuthenLoggedIn] },
    { path: 'manage', component: ManageMemberComponent, canActivate: [AuthenAdmin] },
    { path: 'projects/:id', component: ProjectDetailsComponent, canActivate: [AuthenLoggedIn] },
    { path: 'timeoffs', component: TimeoffManageComponent, canActivate: [AuthenLoggedIn] },
    { path: 'new-timeoff', component: CreateTimeoffComponent, canActivate: [AuthenLoggedIn] },
    { path: 'edit-project/:id', component: EditProjectComponent, canActivate: [AuthenLoggedIn] },
    { path: 'members-confirm/:token', component: MembersConfirmComponent, canActivate: [AuthenLoggedIn] },
    { path: 'report', component: ReportComponent, canActivate: [AuthenLoggedIn] },
    { path: 'edit-timeoff/:id', component: CreateTimeoffComponent, canActivate: [AuthenLoggedIn] },
    { path: 'pass-timeoffs', component: TimeoffPassRequestsComponent, canActivate: [AuthenLoggedIn] },
    { path: 'report-detail/:id/:begin/:end', component: ReportDetailComponent, canActivate: [AuthenLoggedIn] },
    { path: 'report-detail-project/:id/:begin/:end', component: ReportDetailProjectComponent, canActivate: [AuthenLoggedIn] },
    { path: 'report-advance', component: ReportDetailsAdvancesComponent, canActivate: [AuthenLoggedIn] },
    { path: 'profile', component: ProfileComponent, canActivate: [AuthenLoggedIn] },
    { path: 'setting', component: SettingComponent, canActivate: [AuthenLoggedIn] },
    { path: 'invites-confirm/:token/:name/:domain', component: InvitesConfirmComponent },
    // { path: '', component: AppComponent }
    // { path: '', redirectTo: '/home', pathMatch: 'full'}
];
@NgModule({
    imports: [ RouterModule.forRoot(routes) ],
    exports: [ RouterModule ]
})
export class AppRoutingModule {}
