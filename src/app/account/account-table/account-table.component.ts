import { Component, Input } from '@angular/core';

import { DateFormatterService } from '@services/date-formatter.service';
import { AccountService } from '@services/account.service';

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

  constructor(
    private dateFormatter: DateFormatterService,
    private accountService: AccountService
  ) {}

  getTypeCatalogue(category: any)
  {
    if (category.hasOwnProperty("accountCatalogue") && (category.accountCatalogue !== null && category.accountCatalogue !== undefined))
      return category.accountCatalogue.typeAccount;
    else
      return category.typeAccount;
  }

  onRowEditSave(financialData: any)
  {
    for (let category of this.categoryList)
    {
      if (category.id == financialData.categoryDTO.id)
      {
        financialData.categoryDTO.name = category.name;
        break;
      }
    }

    if (financialData.date == null)
      return;

    let date = '';

    if (financialData.date instanceof Date)
      date = this.dateFormatter.formatDate(financialData.date);
    else
      date = financialData.date;

    financialData.date = date;

    let formatData = {
      date: date,
      amount: financialData.amount,
      isRecurring: false,
      categoryId: financialData.categoryDTO.id,
      financialStatementId: financialData.financialStatement.id
    };

    this.accountService
      .editAccount(formatData, financialData.id)
      .subscribe({
        next: (response) => {
          console.log(response);
        },
        error: (error) => {
          console.error(error);
        }
      });
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
