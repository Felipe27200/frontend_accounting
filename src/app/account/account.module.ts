import { NgModule } from '@angular/core';
import { BrowserModule } from '@angular/platform-browser';
import { BrowserAnimationsModule } from '@angular/platform-browser/animations';
import { CommonModule } from '@angular/common';
import { provideHttpClient, withInterceptors, withInterceptorsFromDi } from '@angular/common/http';
import { FormsModule, ReactiveFormsModule } from '@angular/forms';

import { AccountRoutingModule } from './account-routing.module';
import { SharedComponentModule } from 'app/common_components/shared-component.module';

import { AccountListComponent } from './account-list/account-list.component';
import { AccountCenterComponent } from './account-center/account-center.component';
import { AccountTableComponent } from './account-table/account-table.component';

import { JwtInterceptor } from '../interceptors/jwt-interceptor.interceptor';

// Primeng Modules
import { ButtonModule } from 'primeng/button';
import { CardModule } from 'primeng/card';
import { DatePicker } from 'primeng/datepicker';
import { FloatLabel  } from 'primeng/floatlabel';
import { InputTextModule } from 'primeng/inputtext';
import { PanelModule } from 'primeng/panel';
import { Select } from 'primeng/select';
import { TableModule } from 'primeng/table';


@NgModule({ 
    declarations: [
        AccountListComponent,
        AccountCenterComponent,
        AccountTableComponent
    ], 
    imports: [
        CommonModule,
        BrowserModule,
        BrowserAnimationsModule,
        ReactiveFormsModule,
        ButtonModule,
        CardModule,
        DatePicker,
        FloatLabel,
        FormsModule,
        InputTextModule,
        PanelModule,
        Select,
        TableModule,
        SharedComponentModule,
        AccountRoutingModule
    ], 
    providers: [
        /**
         * It's necessary to provide the HttpClient
         * and set up the Interceptors if it has one or more.
         */
        provideHttpClient(withInterceptors([JwtInterceptor])),
        provideHttpClient(withInterceptorsFromDi()),
    ] })
export class AccountModule { }
