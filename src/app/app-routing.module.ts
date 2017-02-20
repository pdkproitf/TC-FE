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

const routes: Routes = [
    { path: 'sign-up', component: SignUpComponent, canActivate: [NotLoggedIn] },
    { path: 'sign-in', component: SignInComponent, canActivate: [NotLoggedIn] },
    { path: 'dashboard', component: DashboardComponent, canActivate: [AuthenLoggedIn] },
    { path: '', component: MarketingPageComponent, canActivate: [NotLoggedIn] },
    { path: 'verify-email/:text', component: VerifyEmailPageComponent, canActivate: [NotLoggedIn] },
    { path: 'projects', component: ProjectManageComponent, canActivate: [AuthenLoggedIn] },
    { path: 'new-project', component: CreateProjectComponent, canActivate: [AuthenLoggedIn] },
    { path: 'manage-member', component: ManageMemberComponent, canActivate: [AuthenLoggedIn] },
    { path: 'projects/:id', component: ProjectDetailsComponent, canActivate: [AuthenLoggedIn] },
    { path: 'timeoffs', component: TimeoffManageComponent, canActivate: [AuthenLoggedIn] },
    // { path: '', component: AppComponent }
    // { path: '', redirectTo: '/home', pathMatch: 'full'}
];
@NgModule({
    imports: [ RouterModule.forRoot(routes) ],
    exports: [ RouterModule ]
})
export class AppRoutingModule {}
