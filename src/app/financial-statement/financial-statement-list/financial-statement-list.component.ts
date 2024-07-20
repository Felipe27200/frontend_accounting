import { Component, OnInit } from '@angular/core';

import { FinancialStatementService } from '@services/financial-statement.service';

import { Message, MessageService } from 'primeng/api';

@Component({
  selector: 'app-financial-statement-list',
  templateUrl: './financial-statement-list.component.html',
  styleUrl: './financial-statement-list.component.css',
  providers: [MessageService],
})
export class FinancialStatementListComponent implements OnInit {
  listStatement: any[] = [];

  constructor(
    private statementService: FinancialStatementService,
    private messageService: MessageService,
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

          console.error(error);
        }
      })
  }
}
