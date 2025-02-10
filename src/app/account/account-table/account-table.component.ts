import { Component, Input } from '@angular/core';

@Component({
    selector: 'app-account-table',
    templateUrl: './account-table.component.html',
    styleUrl: './account-table.component.css',
    standalone: false
})
export class AccountTableComponent 
{
  @Input() financialData: any;

  getTypeCatalogue(category: any)
  {

    if (category.hasOwnProperty("accountCatalogue") && (category.accountCatalogue !== null && category.accountCatalogue !== undefined))
      return category.accountCatalogue.typeAccount;
    else
      return category.typeAccount;
  }
}
