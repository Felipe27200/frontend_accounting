import { NgModule } from '@angular/core';
import { BrowserModule } from '@angular/platform-browser';
import { BrowserAnimationsModule } from '@angular/platform-browser/animations';
import { CommonModule } from '@angular/common';
import { provideHttpClient, withInterceptors, withInterceptorsFromDi } from '@angular/common/http';
import { ReactiveFormsModule } from '@angular/forms';

import { AccountRoutingModule } from './account-routing.module';
import { SharedComponentModule } from 'app/common_components/shared-component.module';

import { AccountListComponent } from './account-list/account-list.component';
import { AccountCenterComponent } from './account-center/account-center.component';
import { AccountTableComponent } from './account-table/account-table.component';

import { JwtInterceptor } from '../interceptors/jwt-interceptor.interceptor';

// Primeng Modules
import { TableModule } from 'primeng/table';
import { InputTextModule } from 'primeng/inputtext';
import { Select } from 'primeng/select';
import { FloatLabelModule } from 'primeng/floatlabel';
import { DatePicker } from 'primeng/datepicker';
import { CardModule } from 'primeng/card';
import { PanelModule } from 'primeng/panel';
import { ButtonModule } from 'primeng/button';

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
        DatePicker,
        PanelModule,
        CardModule,
        InputTextModule,
        FloatLabelModule,
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
