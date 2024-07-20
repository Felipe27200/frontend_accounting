import { NgModule } from '@angular/core';
import { RouterModule, Routes } from '@angular/router';

import { authGuard } from 'app/guards/auth.guard';

import { FinancialStatementCenterComponent } from './financial-statement-center/financial-statement-center.component';
import { FinancialStatementCreateComponent } from './financial-statement-create/financial-statement-create.component';
import { FinancialStatementUpdateComponent } from './financial-statement-update/financial-statement-update.component';
import { FinancialStatementListComponent } from './financial-statement-list/financial-statement-list.component';

const routes: Routes = [{
  path: 'financial-statement',
  component: FinancialStatementCenterComponent,
  canActivate: [authGuard],
  children: [
    {
      path: '',
      canActivateChild: [authGuard],
      children: [
        { path: 'create', component: FinancialStatementCreateComponent },
        { path: ':id', component: FinancialStatementUpdateComponent },
        { path: '', component: FinancialStatementListComponent },
      ]
    }
  ]
}];

@NgModule({
  imports: [RouterModule.forChild(routes)],
  exports: [RouterModule]
})
export class FinancialStatementRoutingModule { }
