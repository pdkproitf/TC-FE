import { MembershipService } from './services/membership-service';
import { ClientService } from './services/client-service';
import { ProjectService } from './services/project-service';
import { NotLoggedIn } from './services/not-logged-in';
import { AuthenLoggedIn } from './services/authen-logged-in';
import { UserService } from './services/user-service';
import { LocationStrategy, HashLocationStrategy }from '@angular/common';
import { AppRoutingModule } from './app-routing.module';
import { ToolbarModule, ButtonModule, InputTextModule, MenuModule, AutoCompleteModule, CarouselModule,
  CalendarModule, DropdownModule, DialogModule } from 'primeng/primeng';
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
import { TableComponent } from './table/table.component';

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
    TableComponent
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
  ],
  providers: [{ provide: LocationStrategy, useClass: HashLocationStrategy}, UserService,
  AuthenLoggedIn, NotLoggedIn, ProjectService, ClientService, MembershipService],
  bootstrap: [AppComponent]
})
export class AppModule { }
