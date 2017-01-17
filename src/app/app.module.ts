import { LocationStrategy, HashLocationStrategy }from '@angular/common';
import { AppRoutingModule } from './app-routing.module';
import { ToolbarModule, ButtonModule, InputTextModule } from 'primeng/primeng';
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

@NgModule({
  declarations: [
    AppComponent,
    MarketingPageComponent,
    MarketingMenuBarComponent,
    SignUpComponent,
    SignInComponent,
    DashboardComponent,
    MemberMenuBarComponent
  ],
  imports: [
    BrowserModule,
    FormsModule,
    HttpModule,
    AppRoutingModule,
    ToolbarModule,
    ButtonModule,
    InputTextModule
  ],
  providers: [{ provide: LocationStrategy, useClass: HashLocationStrategy}],
  bootstrap: [AppComponent]
})
export class AppModule { }
