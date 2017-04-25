import { QuotesService } from './services/quotes-service';
import { SharedModulesModule } from './shared-modules/shared-modules.module';
import { ManageAccessModule } from './manage-access/manage-access.module';
import { ManageDashboardModule } from './manage-dashboard/manage-dashboard.module';
import { ManageReportModule } from './manage-report/manage-report.module';
import { ManageTimeOffModule } from './manage-time-off/manage-time-off.module';
import { ManageProjectModule } from './manage-project/manage-project.module';
import { ManageModule } from './manage/manage.module';
import { AuthenNormalPM } from './services/authen-normal-pm';
import { AuthenHighPM } from './services/authen-high-pm';
import { AuthenAdmin } from './services/authen-admin';
import { CompanyService } from './services/company-service';
import { RolesService } from './services/roles-service';
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
import { HolidayService } from './services/holiday-service';
import { LocationStrategy, HashLocationStrategy }from '@angular/common';
import { AppRoutingModule } from './app-routing.module';
import { ToolbarModule, ButtonModule, InputTextModule, MenuModule, AutoCompleteModule,
    CarouselModule, CalendarModule, DropdownModule, DialogModule, ChartModule,
    GrowlModule, ScheduleModule, RadioButtonModule, CheckboxModule, OverlayPanelModule,
    PaginatorModule, TabViewModule, DragDropModule } from 'primeng/primeng';
import { BrowserModule } from '@angular/platform-browser';
import { NgModule } from '@angular/core';
import { FormsModule } from '@angular/forms';
import { HttpModule } from '@angular/http';
import { RouterModule } from '@angular/router';
import { AppComponent } from './app.component';
import { MarketingMenuBarComponent } from './marketing-menu-bar/marketing-menu-bar.component';
import { MemberMenuBarComponent } from './member-menu-bar/member-menu-bar.component';
import { TimeFromSecondsPipe } from './pipes/time-from-seconds.pipe';
import { ReactiveFormsModule }      from '@angular/forms';
import { MomentModule } from 'angular2-moment';
import { CapitalizePipe } from './pipes/capitalize.pipe';
import { GradientPipe }     from './pipes/gradient.pipe';
import { ProfileComponent } from './profile/profile.component';
import { Ng2CloudinaryModule } from 'ng2-cloudinary';
import { FileUploadModule } from 'ng2-file-upload';
import { StickyModule } from 'ng2-sticky-kit/ng2-sticky-kit';
@NgModule({
  declarations: [
    AppComponent,
    MarketingMenuBarComponent,
    MemberMenuBarComponent,
    TimeFromSecondsPipe,
    CapitalizePipe,
    GradientPipe,
    SecondsToHoursPipe,
    DateToStringWeekDayPipe,
    DateToMDYPipe,
    ProfileComponent,
  ],
  imports: [
    BrowserModule,
    FormsModule,
    HttpModule,
    AppRoutingModule,
    ToolbarModule, ButtonModule, InputTextModule, MenuModule, AutoCompleteModule,
    CarouselModule, CalendarModule, DropdownModule, DialogModule, PaginatorModule,
    TabViewModule, ReactiveFormsModule, RadioButtonModule, MomentModule, OverlayPanelModule,
    ChartModule,CheckboxModule, GrowlModule,
    Ng2CloudinaryModule, FileUploadModule,
    ScheduleModule, DragDropModule,
    StickyModule,
    ManageModule,
    ManageProjectModule,
    ManageTimeOffModule,
    ManageReportModule,
    ManageDashboardModule,
    ManageAccessModule,
    SharedModulesModule
  ],
  providers: [{ provide: LocationStrategy, useClass: HashLocationStrategy}, UserService,
  AuthenLoggedIn, NotLoggedIn, ProjectService, ClientService, MembershipService, CategoryService,
  TimerService, ProjectJoinService, TimerFetchService, TaskService, TimeoffService, ReportService,
  JobService, HolidayService, RolesService, CompanyService, AuthenAdmin, AuthenHighPM, AuthenNormalPM,
  QuotesService],
  bootstrap: [AppComponent]
})
export class AppModule { }
