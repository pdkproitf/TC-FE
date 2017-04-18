import { AuthenHighPM } from './services/authen-high-pm';
import { AuthenNormalPM } from './services/authen-normal-pm';
import { AuthenAdmin } from './services/authen-admin';
import { SettingComponent } from './setting/setting.component';
import { InvitesConfirmComponent } from './invites-confirm/invites-confirm.component';
import { ProfileComponent } from './profile/profile.component';
import { MembersConfirmComponent } from './members-confirm/members-confirm.component';
import { VerifyEmailPageComponent } from './verify-email-page/verify-email-page.component';
import { NotLoggedIn } from './services/not-logged-in';
import { AuthenLoggedIn } from './services/authen-logged-in';
import { MarketingPageComponent } from './marketing-page/marketing-page.component';
import { SignInComponent } from './sign-in/sign-in.component';
import { AppComponent } from './app.component';
import { SignUpComponent } from './sign-up/sign-up.component';
import { NgModule }             from '@angular/core';
import { RouterModule, Routes } from '@angular/router';
const routes: Routes = [
    { path: 'sign-up', component: SignUpComponent, canActivate: [NotLoggedIn] },
    { path: 'sign-up/:token/:companyName/:companyDomain', component: SignUpComponent, canActivate: [NotLoggedIn] },
    { path: 'sign-in', component: SignInComponent, canActivate: [NotLoggedIn] },
    { path: 'sign-in/:companyDomain', component: SignInComponent, canActivate: [NotLoggedIn] },
    { path: '', component: MarketingPageComponent, canActivate: [NotLoggedIn] },
    { path: 'verify-email/:text', component: VerifyEmailPageComponent, canActivate: [NotLoggedIn] },
    { path: 'members-confirm/:token', component: MembersConfirmComponent, canActivate: [AuthenLoggedIn] },
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
