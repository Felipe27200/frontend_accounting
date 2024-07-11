import { NgModule } from '@angular/core';
import { CommonModule } from '@angular/common';

import { NavBarComponent } from './nav-bar/nav-bar.component';

import { MenubarModule } from 'primeng/menubar';

/**
 * This module contains all the common components
 * that can be used in other parts of the app
 * 
 * For enable its components to others, them must
 * be declared in declarations[] and exports[] 
 */
@NgModule({
  declarations: [
    NavBarComponent,
  ],
  imports: [
    MenubarModule,
    CommonModule
  ],
  exports: [
    NavBarComponent
  ]
})
export class SharedComponentModule { }
