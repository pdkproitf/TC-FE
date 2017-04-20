import { AuthenHighPM } from './services/authen-high-pm';
import { AuthenNormalPM } from './services/authen-normal-pm';
import { AuthenAdmin } from './services/authen-admin';
import { ProfileComponent } from './profile/profile.component';
import { NotLoggedIn } from './services/not-logged-in';
import { AuthenLoggedIn } from './services/authen-logged-in';
import { AppComponent } from './app.component';
import { NgModule }             from '@angular/core';
import { RouterModule, Routes } from '@angular/router';
const routes: Routes = [
    { path: 'profile', component: ProfileComponent, canActivate: [AuthenLoggedIn] },
    // { path: '', component: AppComponent }
    // { path: '', redirectTo: '/home', pathMatch: 'full'}
];
@NgModule({
    imports: [ RouterModule.forRoot(routes) ],
    exports: [ RouterModule ]
})
export class AppRoutingModule {}
