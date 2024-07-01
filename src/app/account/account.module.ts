import { NgModule } from '@angular/core';
import { CommonModule } from '@angular/common';
import { HttpClientModule, provideHttpClient, withInterceptors } from '@angular/common/http';

import { AccountRoutingModule } from './account-routing.module';
import { AccountListComponent } from './account-list/account-list.component';
import { NavBarComponent } from '../common_components/nav-bar/nav-bar.component';

import { JwtInterceptor } from '../interceptors/jwt-interceptor.interceptor';

// Primeng Modules

/**
  Despite that the module in the level path where NavbarComponent
  is placed, set up MenubarModule, this one is not knowing
  by the current module, so, we have to import it here.
*/
import { MenubarModule } from 'primeng/menubar';

@NgModule({
  declarations: [
    AccountListComponent,
    NavBarComponent
  ],
  imports: [
    CommonModule,
    MenubarModule,
    HttpClientModule,
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
