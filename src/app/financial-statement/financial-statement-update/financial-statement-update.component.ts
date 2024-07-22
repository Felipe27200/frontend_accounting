import { Component, OnInit } from '@angular/core';
import { Router, ActivatedRoute } from '@angular/router';

import { FinancialStatementService } from '@services/financial-statement.service';
import { ErrorResponse } from 'app/response/error-response';
import { switchMap } from 'rxjs';

@Component({
  selector: 'app-financial-statement-update',
  templateUrl: './financial-statement-update.component.html',
  styleUrl: './financial-statement-update.component.css'
})
export class FinancialStatementUpdateComponent implements OnInit 
{
  statement?: any;
  notFound?: ErrorResponse;

  constructor (
    private router: Router,
    private route: ActivatedRoute,
    private statementService: FinancialStatementService
  ) { }

  ngOnInit(): void {
    const id = Number(this.route.snapshot.paramMap.get('id'));

    if (id === undefined || id === null || isNaN(id))
    {
      this.router.navigate(['/financial-statement']);
    }
    else
    {
      this.statementService.getFinancialStatement(id)
        .subscribe({
          next: (response) => {
            this.statement = {
              id: response.id,
              initDate: response.initDate,
              endDate: response.endDate,
              name: response.name,
            };
          },
          error: (error) => {
            this.notFound = error.error;
          }
        });
    }

  }
}
