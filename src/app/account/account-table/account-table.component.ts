import { Component, EventEmitter, Input, Output } from '@angular/core';

import { AccountService } from '@services/account.service';
import { DateFormatterService } from '@services/date-formatter.service';
import { FinancialStatementService } from '@services/financial-statement.service';
import { ConfirmationService } from 'primeng/api';

@Component({
    selector: 'app-account-table',
    templateUrl: './account-table.component.html',
    styleUrl: './account-table.component.css',
    standalone: false,
    providers: [
      ConfirmationService,
    ]
})
export class AccountTableComponent 
{
  @Input() financialDataList: any;
  @Input() categoryList!: any;
  
  @Input() statementName: string = "";
  @Input() dateStart: string = "";
  @Input() dateEnd: string = "";

  @Output() errorRequestEvent = new EventEmitter<any>();
  @Output() onSubmitEvent = new EventEmitter<any>();
  @Output() onDeleteEvent = new EventEmitter<any>();


  statementsByDate!: any;
  clonedFinancialData: { [s: string]: any } = {};

  editingRowKeys: {
    [s: string]: boolean;
  } = {};

  errorList: Array<any> = [];

  constructor(
    private accountService: AccountService,
    private confirmationService: ConfirmationService,
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
    if (!this.validationUpdate(financialData))
      return;

    for (let category of this.categoryList)
    {
      if (category.id == financialData.categoryDTO.id)
      {
        financialData.categoryDTO.name = category.name;
        break;
      }
    }

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
          delete this.errorList[financialData.id];

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

    this.editingRowKeys[financialData.id as string] = false;
    delete this.editingRowKeys[financialData.id as string];
  }

  onRowEditInit(financialData: any)
  {
    this.clonedFinancialData[financialData.id as string] = { ...financialData }
    this.editingRowKeys[financialData.id as string] = true;

    this.getAllStatementByDate(financialData.date, financialData);
  }

  getAllStatementByDate(dateSelected: any, financialData: any)
  {
    this.validationUpdate(financialData);

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
    
    this.editingRowKeys[financialData.id as string] = false;
    delete this.editingRowKeys[financialData.id as string]; 
    
    delete this.errorList[financialData.id];
  }

  validationUpdate(financialData: any): boolean
  {    
    let errorValidation: {
      amount?: any,
      category?: any,
      date?: any,
      statement?: any,
    } = {};

    let isValid = true;

    if (financialData.date === null || financialData.date === undefined)
    {
      errorValidation.date = "The date is required";  
      isValid = false;
    }

    if (!this.dateFormatter.validateFieldDate(financialData.date))
    {
      errorValidation.date = 'The field date must be date with format YYYY-mm-dd';
      isValid = false;
    }
  
    if (financialData.amount == null)
    {
      errorValidation.amount = "The amount is required";
      isValid = false;
    }

    if (isNaN(financialData.amount))
    {
      errorValidation.amount = "The amount must be a number";  
      isValid = false;
    }

    if (financialData.amount <= 0)
    {
      errorValidation.amount = "The amount must be greater than zero";  
      isValid = false;
    }

    if (!isValid)
    {
      this.editingRowKeys[financialData.id as string] = true;
      this.errorList[financialData.id] = errorValidation;
    }

    return isValid;
  }

  validationFieldDate(financialData: any)
  {
    let errorMessage = '';

    if (financialData.date === null || financialData.date === undefined)
      errorMessage = "The date is required";  

    if (!this.dateFormatter.validateFieldDate(financialData.date))
      errorMessage = 'The field date must be date with format YYYY-mm-dd';

    return errorMessage;
  }

  deleteAccount(accountId: number, statementId: number) 
  {
    this.confirmationService.confirm({
        message: 'Do you want to delete this record?',
        header: 'Delete Account',
        icon: 'pi pi-info-circle',
        rejectLabel: 'Cancel',
        rejectButtonProps: {
            label: 'Cancel',
            severity: 'secondary',
            outlined: true,
        },
        acceptButtonProps: {
            label: 'Delete',
            severity: 'danger',
        },

        accept: () => {
          this.onDeleteEvent.emit({
            accountId: +accountId,
            statementId: +statementId
          });
        },
        reject: () => { },
    });
}
}
