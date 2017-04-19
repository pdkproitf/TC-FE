import { InvitesConfirmComponent } from './invites-confirm/invites-confirm.component';
import { AuthenLoggedIn } from './../services/authen-logged-in';
import { NotLoggedIn } from './../services/not-logged-in';
import { MembersConfirmComponent } from './members-confirm/members-confirm.component';
import { VerifyEmailPageComponent } from './verify-email-page/verify-email-page.component';
import { SignInComponent } from './sign-in/sign-in.component';
import { SignUpComponent } from './sign-up/sign-up.component';
import { MarketingPageComponent } from './marketing-page/marketing-page.component';
import { HttpModule } from '@angular/http';
import { FormsModule } from '@angular/forms';
import { BrowserModule } from '@angular/platform-browser';
import { Routes, RouterModule } from '@angular/router';
import { NgModule } from '@angular/core';
import { CommonModule } from '@angular/common';
import { StickyModule } from 'ng2-sticky-kit/ng2-sticky-kit';
import { ToolbarModule, ButtonModule, InputTextModule, MenuModule, AutoCompleteModule,
    CarouselModule, CalendarModule, DropdownModule, DialogModule, ChartModule,
    GrowlModule, ScheduleModule, RadioButtonModule, CheckboxModule, OverlayPanelModule,
    PaginatorModule, TabViewModule, DragDropModule } from 'primeng/primeng';
import { ForgotPasswordComponent } from './forgot-password/forgot-password.component';
import { ResetPasswordComponent } from './reset-password/reset-password.component';
const manageAccessRoutes: Routes = [
  { path: 'sign-up', component: SignUpComponent, canActivate: [NotLoggedIn] },
  { path: 'sign-up/:token/:companyName/:companyDomain', component: SignUpComponent, canActivate: [NotLoggedIn] },
  { path: 'sign-in', component: SignInComponent, canActivate: [NotLoggedIn] },
  { path: 'sign-in/:companyDomain', component: SignInComponent, canActivate: [NotLoggedIn] },
  { path: '', component: MarketingPageComponent, canActivate: [NotLoggedIn] },
  { path: 'verify-email/:text', component: VerifyEmailPageComponent, canActivate: [NotLoggedIn] },
  { path: 'members-confirm/:token', component: MembersConfirmComponent, canActivate: [AuthenLoggedIn] },
  { path: 'invites-confirm/:token/:name/:domain', component: InvitesConfirmComponent },
  { path: 'forgot-password', component: ForgotPasswordComponent, canActivate: [NotLoggedIn] },
  { path: 'reset-password', component: ResetPasswordComponent, canActivate: [NotLoggedIn] },
];
export const manageAccessRouting = RouterModule.forChild(manageAccessRoutes);
@NgModule({
  imports: [
    CommonModule,
    BrowserModule,
    FormsModule,
    HttpModule,
    manageAccessRouting,
    StickyModule,
    ToolbarModule, ButtonModule, InputTextModule, MenuModule, AutoCompleteModule,
    CarouselModule, CalendarModule, DropdownModule, DialogModule, ChartModule,
    GrowlModule, ScheduleModule, RadioButtonModule, CheckboxModule, OverlayPanelModule,
    PaginatorModule, TabViewModule, DragDropModule
  ],
  declarations: [
    MarketingPageComponent,
    SignUpComponent,
    SignInComponent,
    VerifyEmailPageComponent,
    MembersConfirmComponent,
    InvitesConfirmComponent,
    ForgotPasswordComponent,
    ResetPasswordComponent
  ],
  providers: [
    NotLoggedIn, AuthenLoggedIn
  ]
})
export class ManageAccessModule { }
