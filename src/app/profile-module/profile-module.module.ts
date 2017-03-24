import { ProfileModuleRoutingModule } from './profile-module-routing.module';
import { NgModule } from '@angular/core';
import { CommonModule } from '@angular/common';
import { ProfileComponent } from './profile/profile.component';

@NgModule({
  imports: [
    CommonModule,
    ProfileModuleRoutingModule
  ],
  declarations: [ProfileComponent]
})
export class ProfileModuleModule { }
