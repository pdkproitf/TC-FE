import { CapitalizePipe } from './capitalize.pipe';
import { AuthenLoggedIn } from './../services/authen-logged-in';
import { TimeoffTableViewComponent } from './timeoff-table-view/timeoff-table-view.component';
import { TimeoffCalendarComponent } from './timeoff-calendar/timeoff-calendar.component';
import { TimeoffPassRequestsComponent } from './timeoff-pass-requests/timeoff-pass-requests.component';
import { TimeoffPendingRequestsComponent } from './timeoff-pending-requests/timeoff-pending-requests.component';
import { TimeoffListRequestComponent } from './timeoff-list-request/timeoff-list-request.component';
import { CreateTimeoffComponent } from './create-timeoff/create-timeoff.component';
import { TimeoffManageComponent } from './timeoff-manage/timeoff-manage.component';
import { HttpModule } from '@angular/http';
import { FormsModule, ReactiveFormsModule } from '@angular/forms';
import { BrowserModule } from '@angular/platform-browser';
import { Routes, RouterModule } from '@angular/router';
import { NgModule } from '@angular/core';
import { CommonModule } from '@angular/common';
import { MomentModule } from 'angular2-moment';
import { StickyModule } from 'ng2-sticky-kit/ng2-sticky-kit';
import { ToolbarModule, ButtonModule, InputTextModule, MenuModule, AutoCompleteModule,
    CarouselModule, CalendarModule, DropdownModule, DialogModule, ChartModule,
    GrowlModule, ScheduleModule, RadioButtonModule, CheckboxModule, OverlayPanelModule,
    PaginatorModule, TabViewModule, DragDropModule } from 'primeng/primeng';

const manageTimeOffRoutes: Routes =  [
  { path: 'timeoffs', component: TimeoffManageComponent, canActivate: [AuthenLoggedIn] },
  { path: 'new-timeoff', component: CreateTimeoffComponent, canActivate: [AuthenLoggedIn] },
  { path: 'edit-timeoff/:id', component: CreateTimeoffComponent, canActivate: [AuthenLoggedIn] },
  { path: 'pass-timeoffs', component: TimeoffPassRequestsComponent, canActivate: [AuthenLoggedIn] },
];
export const manageTimeOffRouting = RouterModule.forChild(manageTimeOffRoutes);
@NgModule({
  imports: [
    CommonModule,
    BrowserModule,
    FormsModule,
    ReactiveFormsModule,
    HttpModule,
    manageTimeOffRouting,
    ToolbarModule, ButtonModule, InputTextModule, MenuModule, AutoCompleteModule,
    CarouselModule, CalendarModule, DropdownModule, DialogModule, ChartModule,
    GrowlModule, ScheduleModule, RadioButtonModule, CheckboxModule, OverlayPanelModule,
    PaginatorModule, TabViewModule, DragDropModule, StickyModule,
    MomentModule
  ],
  declarations: [
    TimeoffManageComponent,
    CreateTimeoffComponent,
    TimeoffListRequestComponent,
    TimeoffPendingRequestsComponent,
    TimeoffPassRequestsComponent,
    TimeoffCalendarComponent,
    TimeoffTableViewComponent,

    CapitalizePipe
  ],
  providers: [AuthenLoggedIn]
})
export class ManageTimeOffModule { }
