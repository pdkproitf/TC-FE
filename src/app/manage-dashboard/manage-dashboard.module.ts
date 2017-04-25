import { SharedModulesModule } from './../shared-modules/shared-modules.module';
import { AuthenLoggedIn } from './../services/authen-logged-in';
import { RecentTasksLiComponent } from './recent-tasks-li/recent-tasks-li.component';
import { RecentTasksComponent } from './recent-tasks/recent-tasks.component';
import { ProjectInDivComponent } from './project-in-div/project-in-div.component';
import { DetailDateLogLiComponent } from './detail-date-log-li/detail-date-log-li.component';
import { DetailDateLogComponent } from './detail-date-log/detail-date-log.component';
import { DateLogComponent } from './date-log/date-log.component';
import { ProjectFieldComponent } from './project-field/project-field.component';
import { ProjectFieldListComponent } from './project-field-list/project-field-list.component';
import { TimeTrackBarComponent } from './time-track-bar/time-track-bar.component';
import { DashboardComponent } from './dashboard/dashboard.component';
import { Routes, RouterModule } from '@angular/router';
import { HttpModule } from '@angular/http';
import { FormsModule } from '@angular/forms';
import { BrowserModule } from '@angular/platform-browser';
import { NgModule } from '@angular/core';
import { CommonModule } from '@angular/common';
import { StickyModule } from 'ng2-sticky-kit/ng2-sticky-kit';
import { ToolbarModule, ButtonModule, InputTextModule, MenuModule, AutoCompleteModule,
    CarouselModule, CalendarModule, DropdownModule, DialogModule, ChartModule,
    GrowlModule, ScheduleModule, RadioButtonModule, CheckboxModule, OverlayPanelModule,
    PaginatorModule, TabViewModule, DragDropModule } from 'primeng/primeng';
import { FunnyQuotesComponent } from './funny-quotes/funny-quotes.component';

const manageDashboardRoutes: Routes = [
    { path: 'dashboard', component: DashboardComponent, canActivate: [AuthenLoggedIn] },
];
export const manageDashboardRouting = RouterModule.forChild(manageDashboardRoutes);   
@NgModule({
  imports: [
    CommonModule,
    BrowserModule,
    FormsModule,
    HttpModule,
    StickyModule,
    manageDashboardRouting,
    ToolbarModule, ButtonModule, InputTextModule, MenuModule, AutoCompleteModule,
    CarouselModule, CalendarModule, DropdownModule, DialogModule, ChartModule,
    GrowlModule, ScheduleModule, RadioButtonModule, CheckboxModule, OverlayPanelModule,
    PaginatorModule, TabViewModule, DragDropModule,
    SharedModulesModule
  ],
  declarations: [
    DashboardComponent,
    TimeTrackBarComponent,
    ProjectFieldListComponent,
    ProjectFieldComponent,
    DateLogComponent,
    DetailDateLogComponent,
    DetailDateLogLiComponent,
    ProjectInDivComponent,
    RecentTasksComponent,
    RecentTasksLiComponent,
    FunnyQuotesComponent,
  ],
  providers: [
    AuthenLoggedIn
  ]
})
export class ManageDashboardModule { }
