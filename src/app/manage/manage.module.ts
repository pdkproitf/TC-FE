import { CapitalizePipe } from './capitalize.pipe';
import { ManageHolidayComponent } from './manage-holiday/manage-holiday.component';
import { HttpModule } from '@angular/http';
import { FormsModule } from '@angular/forms';
import { BrowserModule } from '@angular/platform-browser';
import { NotLoggedIn } from './../services/not-logged-in';
import { AuthenNormalPM } from './../services/authen-normal-pm';
import { AuthenHighPM } from './../services/authen-high-pm';
import { AuthenAdmin } from './../services/authen-admin';
import { AuthenLoggedIn } from './../services/authen-logged-in';
import { UserService } from './../services/user-service';
import { Routes, RouterModule } from '@angular/router';
import { ManageJobComponent } from './manage-job/manage-job.component';
import { ManageCompanyComponent } from './manage-company/manage-company.component';
import { ManageMemberComponent } from './manage-member/manage-member.component';
import { NgModule } from '@angular/core';
import { CommonModule } from '@angular/common';
import { StickyModule } from 'ng2-sticky-kit/ng2-sticky-kit';
import { ToolbarModule, ButtonModule, InputTextModule, MenuModule, AutoCompleteModule,
    CarouselModule, CalendarModule, DropdownModule, DialogModule, ChartModule,
    GrowlModule, ScheduleModule, RadioButtonModule, CheckboxModule, OverlayPanelModule,
    PaginatorModule, TabViewModule, DragDropModule } from 'primeng/primeng';
const manageRoutes: Routes = [
  { path: 'manage', component: ManageMemberComponent, canActivate: [AuthenAdmin] },
];
export const manageRouting = RouterModule.forChild(manageRoutes);
@NgModule({
  imports: [
    CommonModule,
    BrowserModule,
    FormsModule,
    HttpModule,
    manageRouting,
    ToolbarModule, ButtonModule, InputTextModule, MenuModule, AutoCompleteModule,
    CarouselModule, CalendarModule, DropdownModule, DialogModule, ChartModule,
    GrowlModule, ScheduleModule, RadioButtonModule, CheckboxModule, OverlayPanelModule,
    PaginatorModule, TabViewModule, DragDropModule, StickyModule
  ],
  declarations: [
    ManageMemberComponent,
    ManageCompanyComponent,
    ManageJobComponent,
    ManageHolidayComponent,
    CapitalizePipe
  ],
  providers: [AuthenAdmin],

})
export class ManageModule { }
