import { Component, OnInit  } from '@angular/core';
import { FormBuilder, Validators } from '@angular/forms';

import { FinancialStatementService } from '@services/financial-statement.service';
import { CategoryService } from '@services/category.service';

@Component({
  selector: 'app-account-list',
  templateUrl: './account-list.component.html',
  styleUrl: './account-list.component.css'
})
export class AccountListComponent implements OnInit {
  statementList = [];
  categoryList = [];

  accountForm = this.fb.group({
    amount: ['', Validators.required],
    date: [Date, Validators.required],
    is_recurring: [''],
    category_id: ['', Validators.required],
    financial_statement: ['', Validators.required]
  });

  filterForm = this.fb.group({
    statementSelected: [''],
    init_date: [Date],
    end_date: [Date],
    categorySelected: [''],
  });

  constructor(
    private fb: FormBuilder,
    private statementService: FinancialStatementService,
    private categoryService: CategoryService,
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

  financialData = [
    {
        Date: '2024-01-15',
        Description: 'Freelance project payment',
        Income: 1200,
        Outcome: 0
    },
    {
        Date: '2024-02-02',
        Description: 'Grocery shopping',
        Income: 0,
        Outcome: 150
    },
    {
        Date: '2024-02-10',
        Description: 'Rent payment',
        Income: 0,
        Outcome: 800
    },
    {
        Date: '2024-03-05',
        Description: 'Selling old furniture',
        Income: 300,
        Outcome: 0
    },
    {
        Date: '2024-03-15',
        Description: 'Electricity bill',
        Income: 0,
        Outcome: 100
    },
    {
        Date: '2024-04-01',
        Description: 'Part-time job earnings',
        Income: 600,
        Outcome: 0
    },
    {
        Date: '2024-04-20',
        Description: 'Dining out with friends',
        Income: 0,
        Outcome: 80
    },
    {
        Date: '2024-05-10',
        Description: 'Online course refund',
        Income: 200,
        Outcome: 0
    },
    {
        Date: '2024-05-25',
        Description: 'Gas station expenses',
        Income: 0,
        Outcome: 60
    },
    {
        Date: '2024-06-10',
        Description: 'Dividend from stocks',
        Income: 150,
        Outcome: 0
    },
    {
        Date: '2024-06-15',
        Description: 'Clothing purchase',
        Income: 0,
        Outcome: 120
    }
];
}
