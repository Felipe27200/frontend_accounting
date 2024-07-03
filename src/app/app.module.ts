import { NgModule } from '@angular/core';
import { ReactiveFormsModule, FormsModule  } from '@angular/forms';
import { BrowserModule } from '@angular/platform-browser'; 
import { HttpClientModule, provideHttpClient } from '@angular/common/http';

// Components
import { AppComponent } from './app.component';
import { LoginComponent } from './login/login.component';

import { AppRoutingModule } from './app-routing.module';

// App Modules
import { AccountModule } from './account/account.module';
import { CategoryModule } from './category/category.module';
import { SharedComponentModule } from './common_components/shared-component.module';

// PrimeNg Components
import { ButtonModule } from 'primeng/button';
import { InputTextModule } from 'primeng/inputtext';
import { CardModule } from 'primeng/card';
import { MenubarModule } from 'primeng/menubar';

@NgModule({
  declarations: [
    AppComponent,
    LoginComponent,
  ],
  imports: [
    BrowserModule,
    CardModule,
    ButtonModule,
    InputTextModule,
    MenubarModule,
    FormsModule,
    ReactiveFormsModule,
    SharedComponentModule,
    AccountModule,
    CategoryModule,
    AppRoutingModule,
    HttpClientModule
  ],
  providers: [
    provideHttpClient(),
  ],
  bootstrap: [AppComponent]
})
export class AppModule { }
