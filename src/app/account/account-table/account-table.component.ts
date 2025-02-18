import { Component, EventEmitter, Input, Output } from '@angular/core';

import { AccountService } from '@services/account.service';
import { DateFormatterService } from '@services/date-formatter.service';
import { FinancialStatementService } from '@services/financial-statement.service';

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

  @Output() errorRequestEvent = new EventEmitter<any>();
  @Output() onSubmitEvent = new EventEmitter<any>();

  statementsByDate!: any;
  clonedFinancialData: { [s: string]: any } = {};

  constructor(
    private accountService: AccountService,
    private dateFormatter: DateFormatterService,
    private statementService: FinancialStatementService,
  ) {}

  getTypeCatalogue(category: any)
  {
    if (category.hasOwnProperty("accountCatalogue") && (category.accountCatalogue !== null && category.accountCatalogue !== undefined))
      return category.accountCatalogue.typeAccount;
    else
      return category.typeAccount;
  }

  onRowEditSave(financialData: any, index: string | number)
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
          this.onSubmitEvent.emit({
            response, 
            message: "Account updated successfully.",
            title: "Account updated",
          });
        },
        error: (error) => {
          this.onRowEditCancel(financialData, index);
          this.errorRequestEvent.emit(error);
        }
      });
  }

  onRowEditInit(financialData: any)
  {
    this.clonedFinancialData[financialData.id as string] = { ...financialData }

    this.getAllStatementByDate(financialData.date);
  }

  getAllStatementByDate(dateSelected: any)
  {
    if (dateSelected === null)
    {
      this.statementsByDate = [];
      return;
    }

    if (typeof dateSelected == 'string')
      dateSelected = this.dateFormatter.convertToAccordDate(dateSelected);

    if (!(dateSelected instanceof Date))
    {
      this.statementsByDate = [];
      return;
    }
  
    let date = dateSelected;
    let dateFormat = this.dateFormatter.formatDate(date);

    this.statementService.findAllByDate(dateFormat)
      .subscribe({
        next: (response) => {
            this.statementsByDate = response;
        },
        error: (error) => {
          this.errorRequestEvent.emit(error);
        }
      });
  }

  onRowEditCancel(financialData: any, index: string | number)
  {
    this.financialDataList[index] = this.clonedFinancialData[financialData.id as string];

    delete this.clonedFinancialData[financialData.id as string];
  }
}
