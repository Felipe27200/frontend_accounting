import { Component, OnInit } from '@angular/core';
import { Router, ActivatedRoute } from '@angular/router';

import { FinancialStatementService } from '@services/financial-statement.service';

import { ConfirmationService, Message, MessageService } from 'primeng/api';

@Component({
  selector: 'app-financial-statement-list',
  templateUrl: './financial-statement-list.component.html',
  styleUrl: './financial-statement-list.component.css',
  providers: [ConfirmationService, MessageService],
})
export class FinancialStatementListComponent implements OnInit {
  listStatement: any[] = [];

  constructor(
    private statementService: FinancialStatementService,
    private messageService: MessageService,
    private confirmationService: ConfirmationService,
    private router: Router,
    private route: ActivatedRoute
  ) { }

  ngOnInit(): void {
    this.statementService.getFinancialStatements()
      .subscribe({
        next: (response) => {
          console.dir(response)
          this.listStatement = response;
        },
        error: (error) => {
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
        }
      })
  }

  editStatement(id: string | number)
  {
    this.router.navigate(['/financial-statement', +id!]);
  }

  dialogDeleteStatement(statement: any, event: Event)
  {
    let messageEndDate = (statement.endDate !== null && statement.endDate !== undefined) ? ` to ${statement.endDate}` : '';

    this.confirmationService.confirm({
      target: event.target as EventTarget,
      message: `Do you want to delete the Fin. Statement: 
        <br><br><b>${statement.name}</b> with the date ${statement.initDate}${messageEndDate}?`,
      header: 'Delete Fin. Statement',
      icon: 'pi pi-info-circle',
      acceptButtonStyleClass:"p-button-danger p-button-text",
      rejectButtonStyleClass:"p-button-text p-button-text",
      acceptIcon:"none",
      rejectIcon:"none",

      accept: () => {
          this.deleteStatement(+statement.id);
      },
      reject: () => { }
    });
  }

  deleteStatement(id: number)
  {
    this.statementService.deleteFinancialStatement(+id)
      .subscribe({
        next: (response) => {
          this.messageService.add({ severity: 'info', summary: 'Confirmed', detail: response.body });
          this.ngOnInit();
        },
        error: (error) => {
          if (error.hasOwnProperty("error") && error.error.hasOwnProperty("message"))
            this.messageService.add({ severity: 'error', summary: 'Error', detail: error.error.message });
        }
      });
  }
}
