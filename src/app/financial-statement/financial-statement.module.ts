import { NgModule } from '@angular/core';
import { CommonModule } from '@angular/common';
import { ReactiveFormsModule } from '@angular/forms';
import { BrowserModule } from '@angular/platform-browser';
import { BrowserAnimationsModule } from '@angular/platform-browser/animations';

import { FinancialStatementCenterComponent } from './financial-statement-center/financial-statement-center.component';
import { FinancialStatementUpdateComponent } from './financial-statement-update/financial-statement-update.component';
import { FinancialStatementCreateComponent } from './financial-statement-create/financial-statement-create.component';
import { FinancialStatementFormComponent } from './financial-statement-form/financial-statement-form.component';
import { FinancialStatementListComponent } from './financial-statement-list/financial-statement-list.component';

import { SharedComponentModule } from 'app/common_components/shared-component.module';
import { FinancialStatementRoutingModule } from './financial-statement-routing.module';

// Primeng Modules
import { InputTextModule } from 'primeng/inputtext';
import { ButtonModule } from 'primeng/button';
import { ConfirmDialogModule } from 'primeng/confirmdialog';
import { CardModule } from 'primeng/card';
import { ToastModule } from 'primeng/toast';
import { RippleModule } from 'primeng/ripple';
import { CalendarModule } from 'primeng/calendar';
import { TableModule } from 'primeng/table';


@NgModule({
  declarations: [
    FinancialStatementCenterComponent,
    FinancialStatementUpdateComponent,
    FinancialStatementCreateComponent,
    FinancialStatementFormComponent,
    FinancialStatementListComponent
  ],
  imports: [
    CommonModule,
    BrowserModule,
    BrowserAnimationsModule,
    InputTextModule,
    ButtonModule,
    CalendarModule,
    TableModule,
    ConfirmDialogModule,
    CardModule,
    ToastModule,
    RippleModule,
    ReactiveFormsModule,
    SharedComponentModule,
    FinancialStatementRoutingModule,
  ]
})
export class FinancialStatementModule { }
