import { JobService } from './services/job-service';
import { DateToMDYPipe } from './pipes/string-date-mdy.pipe';
import { DateToStringWeekDayPipe } from './pipes/date-to-string-weekday.pipe';
import { SecondsToHoursPipe } from './pipes/seconds-to-hours.pipe';
import { ReportService } from './services/report-service';
import { TaskService } from './services/task-service';
import { TimerFetchService } from './services/timer-fetch-service';
import { ProjectJoinService } from './services/project-join-service';
import { TimerService } from './services/timer-service';
import { CategoryService } from './services/category-service';
import { MembershipService } from './services/membership-service';
import { ClientService } from './services/client-service';
import { ProjectService } from './services/project-service';
import { TimeoffService } from './services/timeoff-service';
import { NotLoggedIn } from './services/not-logged-in';
import { AuthenLoggedIn } from './services/authen-logged-in';
import { UserService } from './services/user-service';
import { LocationStrategy, HashLocationStrategy }from '@angular/common';
import { AppRoutingModule } from './app-routing.module';
import { ToolbarModule, ButtonModule, InputTextModule, MenuModule, AutoCompleteModule, CarouselModule,
  CalendarModule, DropdownModule, DialogModule, ChartModule, GrowlModule } from 'primeng/primeng';
import { BrowserModule } from '@angular/platform-browser';
import { NgModule } from '@angular/core';
import { FormsModule } from '@angular/forms';
import { HttpModule } from '@angular/http';
import { RouterModule } from '@angular/router';
import { AppComponent } from './app.component';
import { MarketingPageComponent } from './marketing-page/marketing-page.component';
import { MarketingMenuBarComponent } from './marketing-menu-bar/marketing-menu-bar.component';
import { SignUpComponent } from './sign-up/sign-up.component';
import { SignInComponent } from './sign-in/sign-in.component';
import { DashboardComponent } from './dashboard/dashboard.component';
import { MemberMenuBarComponent } from './member-menu-bar/member-menu-bar.component';
import { TimeTrackBarComponent } from './time-track-bar/time-track-bar.component';
import { ProjectFieldListComponent } from './project-field-list/project-field-list.component';
import { ProjectFieldComponent } from './project-field/project-field.component';
import { DateLogComponent } from './date-log/date-log.component';
import { VerifyEmailPageComponent } from './verify-email-page/verify-email-page.component';
import { DetailDateLogComponent } from './detail-date-log/detail-date-log.component';
import { ProjectManageComponent } from './project-manage/project-manage.component';
import { CreateProjectComponent } from './create-project/create-project.component';
import { ManageMemberComponent } from './manage-member/manage-member.component';
import { ProjectListComponent } from './project-list/project-list.component';
import { ProjectDetailsComponent } from './project-details/project-details.component';
import { ProjecTableComponent } from './project-table/project-table.component';
import { AddingMemberComponent } from './adding-member/adding-member.component';
import {PaginatorModule}    from 'primeng/primeng';
import {TabViewModule}      from 'primeng/primeng';
import { ProjectDetailsTasksComponent } from './project-details-tasks/project-details-tasks.component';
import { ProjectDetailsTeamComponent } from './project-details-team/project-details-team.component';
import { DetailDateLogLiComponent } from './detail-date-log-li/detail-date-log-li.component';
import { ProjectInDivComponent } from './project-in-div/project-in-div.component';
import { RecentTasksComponent } from './recent-tasks/recent-tasks.component';
import { RecentTasksLiComponent } from './recent-tasks-li/recent-tasks-li.component';
import { TimeFromSecondsPipe } from './pipes/time-from-seconds.pipe';
import { TimeoffManageComponent }   from './timeoff-manage/timeoff-manage.component';
import { CreateTimeoffComponent }   from './create-timeoff/create-timeoff.component';
import { ReactiveFormsModule }      from '@angular/forms';
import { RadioButtonModule }    from 'primeng/primeng';
import { TimeoffListRequestComponent } from './timeoff-list-request/timeoff-list-request.component';
import { MomentModule } from 'angular2-moment';
import { CapitalizePipe } from './pipes/capitalize.pipe';
import { TimeoffPendingRequestsComponent } from './timeoff-pending-requests/timeoff-pending-requests.component';
import { EditProjectComponent } from './edit-project/edit-project.component';
import { MembersConfirmComponent } from './members-confirm/members-confirm.component';
import {OverlayPanelModule}     from 'primeng/primeng';
import { ReportComponent } from './report/report.component';
import { ReportSearchComponent } from './report-search/report-search.component';
import { TimeoffPassRequestsComponent } from './timeoff-pass-requests/timeoff-pass-requests.component';
import { ReportDetailComponent } from './report-detail/report-detail.component';
import { ReportDetailProjectComponent } from './report-detail-project/report-detail-project.component';
import { TimeoffCalendarComponent } from './timeoff-calendar/timeoff-calendar.component';
import { TimeoffTableViewComponent } from './timeoff-table-view/timeoff-table-view.component';
import { CheckboxModule }   from 'primeng/primeng';
import { GradientPipe }     from './pipes/gradient.pipe';
import { ReportDetailsAdvancesComponent } from './report-details-advances/report-details-advances.component';
import { ReportDetailsAdvancesListComponent } from './report-details-advances-list/report-details-advances-list.component';
import { ProfileComponent } from './profile/profile.component';

@NgModule({
  declarations: [
    AppComponent,
    MarketingPageComponent,
    MarketingMenuBarComponent,
    SignUpComponent,
    SignInComponent,
    DashboardComponent,
    MemberMenuBarComponent,
    TimeTrackBarComponent,
    ProjectFieldListComponent,
    ProjectFieldComponent,
    DateLogComponent,
    VerifyEmailPageComponent,
    DetailDateLogComponent,
    ProjectManageComponent,
    CreateProjectComponent,
    ManageMemberComponent,
    ProjectListComponent,
    ProjectDetailsComponent,
    AddingMemberComponent,
    ProjecTableComponent,
    ProjectDetailsComponent,
    ProjectDetailsTasksComponent,
    ProjectDetailsTeamComponent,
    DetailDateLogLiComponent,
    ProjectInDivComponent,
    TimeFromSecondsPipe,
    TimeoffManageComponent,
    CreateTimeoffComponent,
    RecentTasksComponent,
    RecentTasksLiComponent,
    TimeFromSecondsPipe,
    TimeoffListRequestComponent,
    CapitalizePipe,
    TimeoffPendingRequestsComponent,
    EditProjectComponent,
    MembersConfirmComponent,
    TimeoffPassRequestsComponent,
    MembersConfirmComponent,
    ReportComponent,
    ReportSearchComponent,
    ReportDetailComponent,
    ReportDetailProjectComponent,
    TimeoffCalendarComponent,
    TimeoffTableViewComponent,
    GradientPipe,
    ReportDetailsAdvancesComponent,
    ReportDetailsAdvancesListComponent,
    SecondsToHoursPipe,
    DateToStringWeekDayPipe,
    DateToMDYPipe,
    ProfileComponent
  ],
  imports: [
    BrowserModule,
    FormsModule,
    HttpModule,
    AppRoutingModule,
    ToolbarModule,
    ButtonModule,
    InputTextModule,
    MenuModule,
    AutoCompleteModule,
    CarouselModule,
    CalendarModule,
    DropdownModule,
    DialogModule,
    PaginatorModule,
    TabViewModule,
    ReactiveFormsModule,
    RadioButtonModule,
    MomentModule,
    OverlayPanelModule,
    ChartModule,
    CheckboxModule,
    GrowlModule,
  ],
  providers: [{ provide: LocationStrategy, useClass: HashLocationStrategy}, UserService,
  AuthenLoggedIn, NotLoggedIn, ProjectService, ClientService, MembershipService, CategoryService,
  TimerService, ProjectJoinService, TimerFetchService, TaskService, TimeoffService, ReportService,
  JobService],
  bootstrap: [AppComponent]
})
export class AppModule { }
