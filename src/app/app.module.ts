import { NotLoggedIn } from './services/not-logged-in';
import { AuthenLoggedIn } from './services/authen-logged-in';
import { UserService } from './services/user-service';
import { LocationStrategy, HashLocationStrategy }from '@angular/common';
import { AppRoutingModule } from './app-routing.module';
import { ToolbarModule, ButtonModule, InputTextModule, MenuModule, AutoCompleteModule, CarouselModule,
  CalendarModule } from 'primeng/primeng';
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
    DateLogComponent
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
    CalendarModule
  ],
  providers: [{ provide: LocationStrategy, useClass: HashLocationStrategy}, UserService,
  AuthenLoggedIn, NotLoggedIn],
  bootstrap: [AppComponent]
})
export class AppModule { }
