import { NgModule } from '@angular/core';
import { CommonModule } from '@angular/common';

import { CategoryRoutingModule } from './category-routing.module';
import { SharedComponentModule } from 'app/common_components/shared-component.module';

import { CategoryCenterComponent } from './category-center/category-center.component';
import { CategoryCreateComponent } from './category-create/category-create.component';
import { CategoryListComponent } from './category-list/category-list.component';

@NgModule({
  declarations: [
    CategoryCenterComponent,
    CategoryCreateComponent,
    CategoryListComponent,
  ],
  imports: [
    CommonModule,
    SharedComponentModule,
    CategoryRoutingModule
  ]
})
export class CategoryModule { }
