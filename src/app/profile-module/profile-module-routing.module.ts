import { AuthenLoggedIn } from './../services/authen-logged-in';
import { ProfileComponent } from './profile/profile.component';
import { NgModule }             from '@angular/core';
import { RouterModule, Routes } from '@angular/router';
const routes: Routes = [
    { path: 'profile', component: ProfileComponent, canActivate: [AuthenLoggedIn] },
];
@NgModule({
    imports: [ RouterModule.forRoot(routes) ],
    exports: [ RouterModule ]
})
export class ProfileModuleRoutingModule {}
