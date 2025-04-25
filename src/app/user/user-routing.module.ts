import { NgModule } from '@angular/core';
import { RouterModule, Routes } from '@angular/router';

import { UserCreateComponent } from './user-create/user-create.component';

const routes: Routes = [
  { path: "signup", component: UserCreateComponent }
];

@NgModule({
  imports: [RouterModule.forChild(routes)],
  exports: [RouterModule]
})
export class UserRoutingModule { }
