import { NgModule } from '@angular/core';
import { CommonModule } from '@angular/common';

import { CategoryRoutingModule } from './category-routing.module';

import { CategoryCenterComponent } from './category-center/category-center.component';
import { CategoryCreateComponent } from './category-create/category-create.component';
import { CategoryListComponent } from './category-list/category-list.component';

@NgModule({
  declarations: [
    CategoryCenterComponent,
    CategoryCreateComponent,
    CategoryListComponent
  ],
  imports: [
    CommonModule,
    CategoryRoutingModule
  ]
})
export class CategoryModule { }
