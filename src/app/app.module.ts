import { NgModule } from '@angular/core';
import { ReactiveFormsModule, FormsModule  } from '@angular/forms';
import { BrowserModule } from '@angular/platform-browser'; 
import { provideHttpClient, withInterceptorsFromDi } from '@angular/common/http';

import { provideAnimationsAsync } from '@angular/platform-browser/animations/async';
import { providePrimeNG } from 'primeng/config';
import Lara from '@primeng/themes/lara';

// Components
import { AppComponent } from './app.component';
import { LoginComponent } from './login/login.component';

import { AppRoutingModule } from './app-routing.module';

// App Modules
import { AccountModule } from './account/account.module';
import { AdminModule } from './admin/admin.module';
import { CategoryModule } from './category/category.module';
import { FinancialStatementModule } from './financial-statement/financial-statement.module';
import { SharedComponentModule } from './common_components/shared-component.module';
import { UserModule } from './user/user.module';

// PrimeNg Components
import { ButtonModule } from 'primeng/button';
import { InputTextModule } from 'primeng/inputtext';
import { CardModule } from 'primeng/card';
import { MenubarModule } from 'primeng/menubar';
import { MessageModule } from 'primeng/message';
import { BrowserAnimationsModule } from '@angular/platform-browser/animations';


@NgModule({ declarations: [
        AppComponent,
        LoginComponent,
    ],
    bootstrap: [AppComponent], 
    imports: [
        BrowserModule,
        BrowserAnimationsModule,
        CardModule,
        ButtonModule,
        InputTextModule,
        MenubarModule,
        MessageModule,
        FormsModule,
        ReactiveFormsModule,
        SharedComponentModule,
        AccountModule,
        AdminModule,
        CategoryModule,
        UserModule,
        FinancialStatementModule,
        AppRoutingModule
    ], 
    providers: [
        provideHttpClient(),
        provideHttpClient(withInterceptorsFromDi()),
        provideAnimationsAsync(),
        providePrimeNG({ 
            theme: {
                preset: Lara
            }
        })
    ] 
})
export class AppModule { }
