import { NgModule } from '@angular/core';
import { RouterModule, Routes } from '@angular/router';

import { UserUpdateComponent } from './user-update/user-update.component';
import { UserCreateComponent } from './user-create/user-create.component';
import { UserCenterComponent } from './user-center/user-center.component';
import { authGuard } from 'app/guards/auth.guard';
import { ChangePasswordComponent } from './change-password/change-password.component';

const routes: Routes = [
  { path: "signup", component: UserCreateComponent },
  { 
    path: "user-config",
    component: UserCenterComponent,
    canActivate: [ authGuard ],
    children: [{
      path: "",
      canActivateChild: [authGuard],
      children: [
        { path: '', component: UserUpdateComponent },
        { path: 'change-password', component: ChangePasswordComponent }
      ]
    }]
  }
];

@NgModule({
  imports: [RouterModule.forChild(routes)],
  exports: [RouterModule]
})
export class UserRoutingModule { }
