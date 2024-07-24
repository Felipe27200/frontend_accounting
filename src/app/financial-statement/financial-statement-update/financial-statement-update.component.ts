import { Component, OnInit } from '@angular/core';
import { Router, ActivatedRoute } from '@angular/router';

import { FinancialStatementService } from '@services/financial-statement.service';
import { ErrorResponse } from 'app/response/error-response';
import { FormStatement } from '../FormStatement';

import { MessageService } from 'primeng/api';
// import { ConfirmDialog } from 'primeng/confirmdialog';
import { Message } from 'primeng/api';

@Component({
  selector: 'app-financial-statement-update',
  templateUrl: './financial-statement-update.component.html',
  styleUrl: './financial-statement-update.component.css',
  providers: [MessageService]
})
export class FinancialStatementUpdateComponent implements OnInit 
{
  statement?: any;
  notFound?: ErrorResponse;
  enableButton: boolean = true;

  constructor (
    private router: Router,
    private route: ActivatedRoute,
    private statementService: FinancialStatementService,
    private messageService: MessageService,
    // private confirmDialog: ConfirmDialog
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

  onSubmit(formData: FormStatement)
  {
    this.enableButton = false;

    console.dir(formData);

    this.statementService.updateFinancialStatement(formData, this.statement.id)
      .subscribe({
        next: (response: any) => {
          this.router.navigate(['/financial-statement']);
        },
        error: (error: any) => {
          let listErrors: Message[] = [];

          if (error.hasOwnProperty("error") && error.error.hasOwnProperty("message"))
            listErrors.push({ severity: 'error', summary: 'Error', detail: error.error.message });

          if (Array.isArray(error.error.errors))
          {
            error.error.errors.forEach((element: any) => {
              listErrors.push({ severity: 'error', summary: 'Error', detail: element });
            });
          }

          this.messageService.addAll(listErrors);
          this.enableButton = true;
        }
      });
  }
}
