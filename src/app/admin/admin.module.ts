import { NgModule } from '@angular/core';
import { BrowserModule } from '@angular/platform-browser';
import { BrowserAnimationsModule } from '@angular/platform-browser/animations';
import { CommonModule } from '@angular/common';

import { AdminRoutingModule } from './admin-routing.module';

import { AdminCenterComponent } from './admin-center/admin-center.component';
import { SharedComponentModule } from 'app/common_components/shared-component.module';
import { AdminListComponent } from './admin-list/admin-list.component';

import { ButtonModule } from 'primeng/button';
import { CardModule } from 'primeng/card';
import { IconFieldModule } from 'primeng/iconfield';
import { InputIconModule } from 'primeng/inputicon';
import { InputTextModule } from 'primeng/inputtext';
import { TableModule } from 'primeng/table';
import { AdminUpdateComponent } from './admin-update/admin-update.component';

@NgModule({
  declarations: [
    AdminCenterComponent,
    AdminListComponent,
    AdminUpdateComponent
  ],
  imports: [
    CommonModule,
    BrowserModule,
    BrowserAnimationsModule,
    SharedComponentModule,
    ButtonModule,
    CardModule,
    IconFieldModule,
    InputIconModule,
    InputTextModule,
    TableModule,
    AdminRoutingModule
  ]
})
export class AdminModule { }
