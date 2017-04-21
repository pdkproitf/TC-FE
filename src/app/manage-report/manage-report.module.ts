import { SharedModulesModule } from './../shared-modules/shared-modules.module';
import { CapitalizePipe } from './capitalize.pipe';
import { DateToMDYPipe } from './string-date-mdy.pipe';
import { SecondsToHoursPipe } from './seconds-to-hours.pipe';
import { DateToStringWeekDayPipe } from './date-to-string-weekday.pipe';
import { GradientPipe } from './gradient.pipe';
import { TimeFromSecondsPipe } from './time-from-seconds.pipe';
import { AuthenLoggedIn } from './../services/authen-logged-in';
import { ReportDetailsAdvancesListComponent } from './report-details-advances-list/report-details-advances-list.component';
import { ReportDetailsAdvancesComponent } from './report-details-advances/report-details-advances.component';
import { ReportDetailProjectComponent } from './report-detail-project/report-detail-project.component';
import { ReportDetailComponent } from './report-detail/report-detail.component';
import { ReportSearchComponent } from './report-search/report-search.component';
import { ReportComponent } from './report/report.component';
import { HttpModule } from '@angular/http';
import { FormsModule } from '@angular/forms';
import { BrowserModule } from '@angular/platform-browser';
import { NgModule } from '@angular/core';
import { CommonModule } from '@angular/common';
import { Routes, RouterModule } from '@angular/router';
import { StickyModule } from 'ng2-sticky-kit/ng2-sticky-kit';
import { ToolbarModule, ButtonModule, InputTextModule, MenuModule, AutoCompleteModule,
    CarouselModule, CalendarModule, DropdownModule, DialogModule, ChartModule,
    GrowlModule, ScheduleModule, RadioButtonModule, CheckboxModule, OverlayPanelModule,
    PaginatorModule, TabViewModule, DragDropModule } from 'primeng/primeng';
const manageReportRoutes: Routes = [
  { path: 'report', component: ReportComponent, canActivate: [AuthenLoggedIn] },
  { path: 'report-detail/:id/:begin/:end', component: ReportDetailComponent, canActivate: [AuthenLoggedIn] },
  { path: 'report-detail-project/:id/:begin/:end', component: ReportDetailProjectComponent, canActivate: [AuthenLoggedIn] },
  { path: 'report-advance', component: ReportDetailsAdvancesComponent, canActivate: [AuthenLoggedIn] },
];
export const manageReportRouting = RouterModule.forChild(manageReportRoutes);
@NgModule({
  imports: [
    CommonModule,
    BrowserModule,
    FormsModule,
    HttpModule,
    manageReportRouting,
    StickyModule,
    ToolbarModule, ButtonModule, InputTextModule, MenuModule, AutoCompleteModule,
    CarouselModule, CalendarModule, DropdownModule, DialogModule, ChartModule,
    GrowlModule, ScheduleModule, RadioButtonModule, CheckboxModule, OverlayPanelModule,
    PaginatorModule, TabViewModule, DragDropModule,
    SharedModulesModule
  ],
  declarations: [
    ReportComponent,
    ReportSearchComponent,
    ReportDetailComponent,
    ReportDetailProjectComponent,
    ReportDetailsAdvancesComponent,
    ReportDetailsAdvancesListComponent,

    TimeFromSecondsPipe,
    GradientPipe,
    DateToStringWeekDayPipe,
    SecondsToHoursPipe,
    DateToMDYPipe,
    CapitalizePipe
  ],
  providers: [
    AuthenLoggedIn
  ]
})
export class ManageReportModule { }
