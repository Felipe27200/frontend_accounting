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
    this.statementService.getFinancialStatement()
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

  dialogDeleteStatement(id: string | number, name: string, initDate: string, event: Event)
  {
    this.confirmationService.confirm({
      target: event.target as EventTarget,
      message: `Do you want to delete the Fin. Statement: <br>${name} with the date ${initDate}?`,
      header: 'Delete Fin. Statement',
      icon: 'pi pi-info-circle',
      acceptButtonStyleClass:"p-button-danger p-button-text",
      rejectButtonStyleClass:"p-button-text p-button-text",
      acceptIcon:"none",
      rejectIcon:"none",

      accept: () => {
          // this.deleteCategory(id);
      },
      reject: () => { }
    });
  }
}
