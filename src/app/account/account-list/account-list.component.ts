import { Component, OnInit  } from '@angular/core';
import { FormBuilder, Validators } from '@angular/forms';

import { FinancialStatementService } from '@services/financial-statement.service';
import { CategoryService } from '@services/category.service';
import { DateFormatterService } from '@services/date-formatter.service';

@Component({
  selector: 'app-account-list',
  templateUrl: './account-list.component.html',
  styleUrl: './account-list.component.css'
})
export class AccountListComponent implements OnInit {
  toggle = true;

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
  }

  onSubmit()
  {
    this.accountForm.markAllAsTouched();

    if (!this.accountForm.valid)
      return;

    console.log("submit");
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
