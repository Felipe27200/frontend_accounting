import { NgModule } from '@angular/core';
import { RouterModule, Routes } from '@angular/router';

import { AccountListComponent } from './account-list/account-list.component';
import { authGuard } from '../guards/auth.guard';

const routes: Routes = [
  { path: "accounts", component: AccountListComponent, canActivate: [authGuard] }
];

@NgModule({
  imports: [RouterModule.forChild(routes)],
  exports: [RouterModule]
})
export class AccountRoutingModule { }
