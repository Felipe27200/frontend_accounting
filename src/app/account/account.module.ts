import { NgModule } from '@angular/core';
import { BrowserModule } from '@angular/platform-browser';
import { BrowserAnimationsModule } from '@angular/platform-browser/animations';
import { CommonModule } from '@angular/common';
import { HttpClientModule, provideHttpClient, withInterceptors } from '@angular/common/http';
import { ReactiveFormsModule } from '@angular/forms';

import { AccountRoutingModule } from './account-routing.module';
import { SharedComponentModule } from 'app/common_components/shared-component.module';

import { AccountListComponent } from './account-list/account-list.component';
import { AccountCenterComponent } from './account-center/account-center.component';

import { JwtInterceptor } from '../interceptors/jwt-interceptor.interceptor';

// Primeng Modules
import { TableModule } from 'primeng/table';
import { InputTextModule } from 'primeng/inputtext';
import { DropdownModule } from 'primeng/dropdown';
import { FloatLabelModule } from 'primeng/floatlabel';
import { CalendarModule } from 'primeng/calendar';
import { CardModule } from 'primeng/card';
import { PanelModule } from 'primeng/panel';

@NgModule({
  declarations: [
    AccountListComponent,
    AccountCenterComponent,
  ],
  imports: [
    CommonModule,
    BrowserModule,
    BrowserAnimationsModule,
    ReactiveFormsModule,
    HttpClientModule,
    CalendarModule,
    PanelModule,
    CardModule,
    InputTextModule,
    FloatLabelModule,
    DropdownModule,
    TableModule,
    SharedComponentModule,
    AccountRoutingModule,
  ],
  providers: [
    /**
     * It's necessary to provide the HttpClient
     * and set up the Interceptors if it has one or more.
     */
    provideHttpClient(
      withInterceptors([JwtInterceptor])
    ),
  ]
})
export class AccountModule { }
