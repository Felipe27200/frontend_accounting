import { NgModule } from '@angular/core';
import { BrowserModule } from '@angular/platform-browser';
import { BrowserAnimationsModule } from '@angular/platform-browser/animations';
import { CommonModule } from '@angular/common';
import { ReactiveFormsModule } from '@angular/forms';

import { SharedComponentModule } from 'app/common_components/shared-component.module';
import { UserCreateComponent } from './user-create/user-create.component';
import { UserCenterComponent } from './user-center/user-center.component';
import { UserUpdateComponent } from './user-update/user-update.component';

import { ButtonModule } from 'primeng/button';
import { CardModule } from 'primeng/card';
import { InputTextModule } from 'primeng/inputtext';
import { Toast  } from 'primeng/toast';

import { UserRoutingModule } from './user-routing.module';
import { ChangePasswordComponent } from './change-password/change-password.component';

@NgModule({
  declarations: [
    UserCenterComponent,
    UserCreateComponent,
    UserUpdateComponent,
    ChangePasswordComponent,
  ],
  imports: [
    CommonModule,
    BrowserModule,
    BrowserAnimationsModule,
    ReactiveFormsModule,
    InputTextModule,
    ButtonModule,
    CardModule,
    Toast,
    SharedComponentModule,
    UserRoutingModule
  ]
})
export class UserModule { }
