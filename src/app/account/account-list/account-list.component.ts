import { Component, OnInit  } from '@angular/core';
import { FormBuilder } from '@angular/forms';

import { AccountService } from '@services/account.service';
import { CategoryService } from '@services/category.service';
import { CommonResponseService } from '@services/common-response.service';
import { DateFormatterService } from '@services/date-formatter.service';
import { FinancialStatementService } from '@services/financial-statement.service';

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
  validationError: any[] = [];

  categoryList  = [];
  financialDataList = [];
  statementList = [];
  statementsByDate: any[] = [];

  filterForm = this.fb.group({
    categoryFilter: [null],
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
        next: (response) => {
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
        next: (response) => {
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
    }

    this.filterAccounts();
  }

  errorRequestToast(error: any)
  {
    this.messageService.addAll(this.commonResponseService.setToastErrorMessage(error));
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
      categoryId: this.filterForm.get('categoryFilter')?.value,
      initDate: dateInit,
      endDate: dateEnd,
      statementId: this.filterForm.get('statementFilter')?.value,
    }

    this.accountService.filterAccounts(formData)
      .subscribe({
        next: (response) => {
          this.financialDataList = response;
        },
        error: (error) => {
          this.errorRequestToast(error);
        }
      });
  }


  get statementFilter() { return this.filterForm.get('statementFilter') }
}
