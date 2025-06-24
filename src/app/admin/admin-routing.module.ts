import { NgModule } from '@angular/core';
import { RouterModule, Routes } from '@angular/router';

import { AdminCenterComponent } from './admin-center/admin-center.component';

// Guards
import { adminRoleGuard } from 'app/guards/admin-role.guard';
import { authGuard } from 'app/guards/auth.guard';

const routes: Routes = [
  { 
    path: 'admin',
    component: AdminCenterComponent,
    canActivate: [ authGuard, adminRoleGuard ]
  }
];

@NgModule({
  imports: [RouterModule.forChild(routes)],
  exports: [RouterModule]
})
export class AdminRoutingModule { }
