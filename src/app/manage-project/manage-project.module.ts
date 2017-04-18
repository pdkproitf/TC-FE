import { GradientPipe } from './gradient.pipe';
import { TimeFromSecondsPipe } from './time-from-seconds.pipe';
import { ProjectDetailsTeamComponent } from './project-details-team/project-details-team.component';
import { ProjectDetailsTasksComponent } from './project-details-tasks/project-details-tasks.component';
import { ProjecTableComponent } from './project-table/project-table.component';
import { ProjectDetailsComponent } from './project-details/project-details.component';
import { ProjectManageComponent } from './project-manage/project-manage.component';
import { AuthenNormalPM } from './../services/authen-normal-pm';
import { AuthenHighPM } from './../services/authen-high-pm';
import { AddingMemberComponent } from './adding-member/adding-member.component';
import { EditProjectComponent } from './edit-project/edit-project.component';
import { CreateProjectComponent } from './create-project/create-project.component';
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

const manageProjectRoutes: Routes = [
  { path: 'new-project', component: CreateProjectComponent, canActivate: [AuthenHighPM] },
  { path: 'edit-project/:id', component: EditProjectComponent, canActivate: [AuthenNormalPM] },
  { path: 'projects', component: ProjectManageComponent, canActivate: [AuthenNormalPM] },
  { path: 'projects/:id', component: ProjectDetailsComponent, canActivate: [AuthenNormalPM] },
];
export const manageProjectRouting = RouterModule.forChild(manageProjectRoutes);
@NgModule({
  imports: [
    CommonModule,
    BrowserModule,
    FormsModule,
    HttpModule,
    manageProjectRouting,
    StickyModule,
    ToolbarModule, ButtonModule, InputTextModule, MenuModule, AutoCompleteModule,
    CarouselModule, CalendarModule, DropdownModule, DialogModule, ChartModule,
    GrowlModule, ScheduleModule, RadioButtonModule, CheckboxModule, OverlayPanelModule,
    PaginatorModule, TabViewModule, DragDropModule
  ],
  declarations: [
    CreateProjectComponent,
    EditProjectComponent,
    AddingMemberComponent,

    ProjectManageComponent,
    ProjectDetailsComponent,
    ProjecTableComponent,
    ProjectDetailsTasksComponent,
    ProjectDetailsTeamComponent,

    TimeFromSecondsPipe,
    GradientPipe
  ],
  providers: [
    AuthenHighPM, AuthenNormalPM
  ]
})
export class ManageProjectModule { }
