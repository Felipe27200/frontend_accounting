import { Component, OnInit  } from '@angular/core';
import { FormBuilder } from '@angular/forms';

import { AccountService } from '@services/account.service';
import { CategoryService } from '@services/category.service';
import { CommonResponseService } from '@services/common-response.service';
import { DateFormatterService } from '@services/date-formatter.service';
import { FinancialStatementService } from '@services/financial-statement.service';

import { Category } from 'app/interface/category';
import { Statement } from 'app/interface/statement';

import { MessageService } from 'primeng/api';

@Component({
    selector: 'app-account-list',
    templateUrl: './account-list.component.html',
    styleUrl: './account-list.component.css',
    providers: [MessageService],
    standalone: false
})
export class AccountListComponent implements OnInit {
  toggle: boolean = true;
  visibleCategory: boolean = false;
  validationError: any[] = [];

  categoryList: Category[]  = [];
  financialDataList = [];
  statementList: Statement[] = [];
  statementsByDate: any[] = [];

  statementName = "";
  dateStart = "";
  dateEnd = "";

  filterForm = this.fb.group({
    categoryFilter: [],
    init_date: [Date],
    end_date: [Date],
    statementFilter: [null],
  });

  constructor(
    private fb: FormBuilder,
    private accountService: AccountService,
    private categoryService: CategoryService,
    private commonResponseService: CommonResponseService,
    private dateFormatter: DateFormatterService,
    private messageService: MessageService,
    private statementService: FinancialStatementService,
  ) { }

  ngOnInit(): void 
  {
    this.statementService.getFinancialStatements()
      .subscribe({
        next: (response: Statement[]) => {
          this.statementList = response;

          this.statementList.forEach((statement: any) => {
            if (statement.hasOwnProperty('name'))
              statement.name += " - " + (statement.initDate.split("-"))[0];
          });
        },
        error: (error) => {
          this.errorRequestToast(error);
        }
      });

    this.categoryService.getCategories()
      .subscribe({
        next: (response: Category[]) => {
          this.categoryList = response;
        },
        error: (error) => {
          this.errorRequestToast(error);
        }
      });
  }

  onSubmit(response: any)
  {
    if (response.hasOwnProperty("title") && response.title.toUpperCase().includes("ERROR"))
      this.errorRequestToast(response.error);
    else
    {
      this.messageService.add({ 
        severity: "success", 
        summary: response.title, 
        detail: response.message, 
        life: 3000 
      });

      if (response.response.hasOwnProperty('financialStatement'))
        this.getAccountByStatementId(response.response.financialStatement.id);
    }
  }

  onCreateCategory(formData: any)
  {
    this.categoryService.createCategory(formData)
      .subscribe({
        next: (response: any) => {
          this.messageService.add({ 
            severity: "success", 
            summary: "Category Created", 
            detail: "The category '" + response.name + "' was created successfully", 
            life: 3000 
          });

          this.getCategories();
          this.closeDialogCategory();
        },
        error: (error) => {
          this.messageService.addAll(this.commonResponseService.setToastErrorMessage(error));
        }
      });
  }

  onDelete(deleteAccount: any)
  {
    if (deleteAccount.hasOwnProperty('accountId'))
    {
      this.accountService
      .deleteAccount(deleteAccount.accountId)
      .subscribe({
        next: (response) => {  
          this.messageService.add({ 
            severity: 'info', 
            summary: 'Confirmed', 
            detail: 'Record deleted' 
          });
          
          this.getAccountByStatementId(deleteAccount.statementId);
        },
        error: (error) => this.errorRequestToast(error)
      })

    }
  }

  errorRequestToast(error: any)
  {
    this.messageService.addAll(this.commonResponseService.setToastErrorMessage(error));
  }

  getAccountByStatementId(statementId: number)
  {
    this.accountService
      .getAccountsByStatementId(statementId)
      .subscribe({
        next: (response: any) => {
          this.financialDataList = response;
        },
        error: (error) => this.errorRequestToast(error),
      });
  }

  filterAccounts()
  {
    let dateInit:  Date | null | DateConstructor | undefined | string = this.filterForm.get('init_date')?.value;
    let dateEnd:  Date | null | DateConstructor | undefined | string = this.filterForm.get('end_date')?.value;

    if ((dateInit !== null && dateInit !== undefined) && 
        (dateInit instanceof Date))
    {
      dateInit = this.dateFormatter.formatDate(dateInit)
    }
    if ((dateEnd !== null && dateEnd !== undefined) && 
        (dateEnd instanceof Date))
    {
      dateEnd = this.dateFormatter.formatDate(dateEnd)
    }

    let formData = {
      categoryList: this.filterForm.get('categoryFilter')?.value,
      initDate: dateInit,
      endDate: dateEnd,
      statementId: this.filterForm.get('statementFilter')?.value,
    }

    this.dateEnd = '';
    this.dateStart = '';
    this.statementName = '';

    this.accountService.filterAccounts(formData)
      .subscribe({
        next: (response) => {
          this.financialDataList = response;

          if (response == null)
            return;
          
          if (response.length <= 0)
          {
            if (formData.statementId !== null && formData.statementId !== undefined)
            {
              let nameStatement: any = this.statementList.find((element: any) => element.id == formData.statementId);
              
              this.statementName = nameStatement.name;

              this.statementService.getFinancialStatement(nameStatement.id)
                .subscribe({
                  next: (response: Statement) => {
                    this.dateStart = response.initDate as string;
                    this.dateEnd = response.endDate as string;
                  }
                });
            }
          }

          if (typeof formData.initDate == "string")
            this.dateStart = formData.initDate;
            
          if (typeof formData.endDate == "string")
            this.dateEnd = formData.endDate;

          if ((formData.statementId !== null && formData.statementId !== undefined) 
            && (response !== null && response !== undefined)
            && (Array.isArray(response) && response.length > 0)
          )
          {
            response.forEach((statement) => {
              if (statement.financialStatement.id == formData.statementId)
              {
                this.statementName = statement.financialStatement.name;

                if (typeof formData.initDate == "function" || typeof formData.initDate == "object")
                {
                  this.dateStart = statement.financialStatement.initDate;
                }

                if (typeof formData.endDate == "function" || typeof formData.endDate == "object")
                {
                  this.dateEnd = statement.financialStatement.endDate;
                }

                return;
              }
            });
          }

        },
        error: (error) => {
          this.errorRequestToast(error);
        }
      });
  }

  getCategories()
  {
    this.categoryService.getCategories()
    .subscribe({
      next: (response: Category[]) => {
        this.categoryList = response;
      },
      error: (error) => {
        this.errorRequestToast(error);
      }
    });
  }

  showDialogCategory() {
    this.visibleCategory = true;
  }

  closeDialogCategory() 
  {
    this.visibleCategory = false;
  }

  get statementFilter() { return this.filterForm.get('statementFilter') }
}
