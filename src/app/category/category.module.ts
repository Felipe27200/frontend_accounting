import { NgModule } from '@angular/core';
import { BrowserModule } from '@angular/platform-browser';
import { BrowserAnimationsModule } from '@angular/platform-browser/animations';
import { CommonModule } from '@angular/common';
import { ReactiveFormsModule } from '@angular/forms';

import { CategoryRoutingModule } from './category-routing.module';
import { SharedComponentModule } from 'app/common_components/shared-component.module';

import { CategoryCenterComponent } from './category-center/category-center.component';
import { CategoryCreateComponent } from './category-create/category-create.component';
import { CategoryListComponent } from './category-list/category-list.component';
import { CategoryFormComponent } from './category-form/category-form.component';

// Primeng Modules
import { Select } from 'primeng/select';
import { TableModule } from 'primeng/table';
import { InputTextModule } from 'primeng/inputtext';
import { ButtonModule } from 'primeng/button';
import { CategoryUpdateComponent } from './category-update/category-update.component';
import { ConfirmDialogModule } from 'primeng/confirmdialog';
import { CardModule } from 'primeng/card';
import { Toast  } from 'primeng/toast';
import { RippleModule } from 'primeng/ripple';

@NgModule({
  declarations: [
    CategoryFormComponent,
    CategoryCenterComponent,
    CategoryCreateComponent,
    CategoryListComponent,
    CategoryUpdateComponent,
  ],
  imports: [
    CommonModule,
    BrowserModule,
    ReactiveFormsModule,
    BrowserAnimationsModule,
    TableModule,
    CardModule,
    Toast ,
    RippleModule,
    ConfirmDialogModule,
    InputTextModule,
    Select,
    ButtonModule,
    SharedComponentModule,
    CategoryRoutingModule
  ],
  // Export so other components/modules can use it
  exports: [
    CategoryFormComponent
  ]
})
export class CategoryModule { }
