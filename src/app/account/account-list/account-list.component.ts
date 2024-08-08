import { Component, OnInit  } from '@angular/core';
import { FormBuilder, Validators } from '@angular/forms';

import { FinancialStatementService } from '@services/financial-statement.service';
import { CategoryService } from '@services/category.service';
import { DateFormatterService } from '@services/date-formatter.service';
import { AccountService } from '@services/account.service';

@Component({
  selector: 'app-account-list',
  templateUrl: './account-list.component.html',
  styleUrl: './account-list.component.css'
})
export class AccountListComponent implements OnInit {
  toggle: boolean = true;
  validationError: any[] = [];

  categoryList  = [];
  financialData = [];
  statementList = [];
  statementsByDate: any[] = [];

  accountForm = this.fb.group({
    amount: ["", Validators.required],
    date: [Date, Validators.required],
    is_recurring: [''],
    category_id: [null, Validators.required],
    financial_statement: [null, Validators.required]
  });

  filterForm = this.fb.group({
    categoryFilter: [null],
    init_date: [Date],
    end_date: [Date],
    statementFilter: [null],
  });

  constructor(
    private fb: FormBuilder,
    private accountService: AccountService,
    private statementService: FinancialStatementService,
    private categoryService: CategoryService,
    private dateFormatter: DateFormatterService,
  ) { }

  ngOnInit(): void 
  {
    this.statementService.getFinancialStatements()
      .subscribe({
        next: (response) => {
          this.statementList = response;
        },
        error: (error) => {
          console.log(error);
        }
      });

    this.categoryService.getCategories()
      .subscribe({
        next: (response) => {
          this.categoryList = response;
        },
        error: (error) => {
          console.log(error);
        }
      });

    this.accountService.getAccounts()
      .subscribe({
        next: (response) => {
          this.financialData = response;
          console.log(response);
        },
        error: (error) => {
          console.error(error)
        }
      });
  }

  onSubmit()
  {
    this.validationError = [];
    let date = '';

    if (!this.accountForm.valid)
      return;

    if ((this.amount?.value === null || this.amount?.value === undefined || this.amount.value == ''))
      this.validationError.push("The amount is required");
    else if (isNaN(Number(this.amount?.value)))
      this.validationError.push('The amount must be a number');
    else if (Number(this.amount?.value) <= 0)
      this.validationError.push('The amount must be greater than zero');

    if ((this.date?.value === null || this.date?.value === undefined) || (!(this.date.value instanceof Date) && typeof this.date.value != 'string'))
      this.validationError.push("The date is required");
    else if (!this.dateFormatter.validateFieldDate(this.date.value))
      this.validationError.push('The field date must be date with format YYYY-mm-dd');
    else
      date = this.dateFormatter.formatDate(this.date.value);

    if ((this.category_id?.value === null || this.category_id?.value === undefined))
      this.validationError.push("The category is required");
    if ((this.financial_statement?.value === null || this.financial_statement?.value === undefined))
      this.validationError.push("The financial statement is required");

    if (this.validationError.length > 0)
      return;

    if (this.validationError.length > 0)
      return;

    let formData = {
      amount: this.amount?.value,
      date: date,
      categoryId: this.category_id?.value,
      financialStatementId: this.financial_statement?.value,
      isRecurring: false,
    };

    this.accountService.createAccount(formData)
      .subscribe({
        next: (response) => {
          this.ngOnInit();
        },
        error: (error) => {
          console.error(error)
        }
      });
  }

  getAllStatementByDate()
  {
    console.log(this.accountForm.controls.date.value);

    if (this.accountForm.controls.date.value === null)
    {
      this.statementsByDate = [];
      return;
    }

    if (!(this.accountForm.controls.date.value instanceof Date))
    {
      this.statementsByDate = [];
      return;
    }
  
    let date = this.accountForm.controls.date.value;
    let dateFormat = this.dateFormatter.formatDate(date);

    console.log(dateFormat);

    this.statementService.findAllByDate(dateFormat)
      .subscribe({
        next: (response) => {
          this.statementsByDate = response;
        },
        error: (error) => {
          console.error(error);
        }
      });
  }

  togglePanel()
  {
    this.toggle = true;
  }

  get amount() { return this.accountForm.get('amount') }
  get date() { return this.accountForm.get('date') }
  get is_recurring() { return this.accountForm.get('is_recurring') }
  get category_id() { return this.accountForm.get('category_id') }
  get financial_statement() { return this.accountForm.get('financial_statement') }
}
