import { NgModule } from '@angular/core';
import { CommonModule } from '@angular/common';

import { AccountRoutingModule } from './account-routing.module';
import { AccountListComponent } from './account-list/account-list.component';
import { NavBarComponent } from '../nav-bar/nav-bar.component';

// Primeng Modules

/**
  Despite that the module in the level path where NavbarComponent
  is placed, set up MenubarModule, this one is not knowing
  by the current module, so, we have to import it here.
*/
import { MenubarModule } from 'primeng/menubar';

@NgModule({
  declarations: [
    AccountListComponent,
    NavBarComponent
  ],
  imports: [
    CommonModule,
    MenubarModule,
    AccountRoutingModule,
  ]
})
export class AccountModule { }
