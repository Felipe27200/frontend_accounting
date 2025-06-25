import { NgModule } from '@angular/core';
import { BrowserModule } from '@angular/platform-browser';
import { BrowserAnimationsModule } from '@angular/platform-browser/animations';
import { CommonModule } from '@angular/common';

import { AdminRoutingModule } from './admin-routing.module';

import { AdminCenterComponent } from './admin-center/admin-center.component';
import { SharedComponentModule } from 'app/common_components/shared-component.module';
import { AdminListComponent } from './admin-list/admin-list.component';

@NgModule({
  declarations: [
    AdminCenterComponent,
    AdminListComponent
  ],
  imports: [
    CommonModule,
    BrowserModule,
    BrowserAnimationsModule,
    SharedComponentModule,
    AdminRoutingModule
  ]
})
export class AdminModule { }
