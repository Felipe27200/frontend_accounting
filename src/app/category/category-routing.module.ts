import { NgModule } from '@angular/core';
import { RouterModule, Routes } from '@angular/router';

import { CategoryCenterComponent } from './category-center/category-center.component';
import { CategoryCreateComponent } from './category-create/category-create.component';
import { CategoryListComponent } from './category-list/category-list.component';

const routes: Routes = [
  {
    path: 'categories',
    component: CategoryCenterComponent,
    children: [
      { path: 'create', component: CategoryCreateComponent },
      { path: '', component: CategoryListComponent },
    ]
  }
];

@NgModule({
  imports: [RouterModule.forChild(routes)],
  exports: [RouterModule]
})
export class CategoryRoutingModule { }
