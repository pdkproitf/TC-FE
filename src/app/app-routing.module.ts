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

const routes: Routes = [
    { path: 'sign-up', component: SignUpComponent, canActivate: [NotLoggedIn] },
    { path: 'sign-in', component: SignInComponent, canActivate: [NotLoggedIn] },
    { path: 'dashboard', component: DashboardComponent, canActivate: [AuthenLoggedIn] },
    { path: '', component: MarketingPageComponent, canActivate: [NotLoggedIn] },
    { path: 'verify-email/:token', component: VerifyEmailPageComponent, canActivate: [NotLoggedIn]}
    // { path: '', component: AppComponent }
    // { path: '', redirectTo: '/home', pathMatch: 'full'}
];
@NgModule({
    imports: [ RouterModule.forRoot(routes) ],
    exports: [ RouterModule ]
})
export class AppRoutingModule {}
