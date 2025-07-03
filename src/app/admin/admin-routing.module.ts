import { NgModule } from '@angular/core';
import { RouterModule, Routes } from '@angular/router';

import { AdminCenterComponent } from './admin-center/admin-center.component';
import { AdminListComponent } from './admin-list/admin-list.component';
import { AdminUpdateComponent } from './admin-update/admin-update.component';
import { ChangePasswordComponent } from './change-password/change-password.component';

// Guards
import { adminRoleGuard } from 'app/guards/admin-role.guard';
import { authGuard } from 'app/guards/auth.guard';

const routes: Routes = [
  { 
    path: 'admin',
    component: AdminCenterComponent,
    canActivate: [ authGuard, adminRoleGuard ],
    children: [{ 
      path: '',
      canActivateChild: [authGuard, adminRoleGuard],
      children:[
        { path: 'change-password/:id', component: ChangePasswordComponent },
        { path: ':id', component: AdminUpdateComponent },
        { path: '', component: AdminListComponent }
      ]
    }]
  }
];

@NgModule({
  imports: [RouterModule.forChild(routes)],
  exports: [RouterModule]
})
export class AdminRoutingModule { }
