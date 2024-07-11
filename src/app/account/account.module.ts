import { NgModule } from '@angular/core';
import { CommonModule } from '@angular/common';
import { HttpClientModule, provideHttpClient, withInterceptors } from '@angular/common/http';

import { AccountRoutingModule } from './account-routing.module';
import { SharedComponentModule } from 'app/common_components/shared-component.module';

import { AccountListComponent } from './account-list/account-list.component';

import { JwtInterceptor } from '../interceptors/jwt-interceptor.interceptor';

// Primeng Modules

@NgModule({
  declarations: [
    AccountListComponent,
  ],
  imports: [
    CommonModule,
    HttpClientModule,
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
