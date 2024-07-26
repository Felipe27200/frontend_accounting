import { NgModule } from '@angular/core';
import { RouterModule, Routes } from '@angular/router';

import { AccountListComponent } from './account-list/account-list.component';
import { authGuard } from '../guards/auth.guard';
import { AccountCenterComponent } from './account-center/account-center.component';

const routes: Routes = [
  { 
    path: "accounts", 
    component: AccountCenterComponent, 
    canActivate: [authGuard], 
    children: [{
      canActivateChild: [authGuard],
      path: "",
      children: [
        { path: "", component: AccountListComponent }
      ]
    }]
  }
];

@NgModule({
  imports: [RouterModule.forChild(routes)],
  exports: [RouterModule]
})
export class AccountRoutingModule { }
