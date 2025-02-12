import { Component, Input } from '@angular/core';

@Component({
    selector: 'app-account-table',
    templateUrl: './account-table.component.html',
    styleUrl: './account-table.component.css',
    standalone: false
})
export class AccountTableComponent 
{
  @Input() financialDataList: any;
  @Input() categoryList!: any;

  clonedFinancialData: { [s: string]: any } = {};

  getTypeCatalogue(category: any)
  {
    if (category.hasOwnProperty("accountCatalogue") && (category.accountCatalogue !== null && category.accountCatalogue !== undefined))
      return category.accountCatalogue.typeAccount;
    else
      return category.typeAccount;
  }

  onRowEditInit(financialData: any)
  {
    this.clonedFinancialData[financialData.id as string] = { ...financialData }
  }

  onRowEditCancel(financialData: any, index: number)
  {
    this.financialDataList[index] = this.clonedFinancialData[financialData.id as string];

    delete this.clonedFinancialData[financialData.id as string];
  }
}
