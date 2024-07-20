import { Component } from '@angular/core';

import { Router, ActivatedRoute } from '@angular/router';

import { FinancialStatementService } from '@services/financial-statement.service';
import { Message, MessageService } from 'primeng/api';

@Component({
  selector: 'app-financial-statement-create',
  templateUrl: './financial-statement-create.component.html',
  styleUrl: './financial-statement-create.component.css',
  providers: [MessageService],
})
export class FinancialStatementCreateComponent {
  enableButton: boolean = true;

  constructor(
    private router: Router,
    private route: ActivatedRoute,
    private messageService: MessageService,
    private statementService: FinancialStatementService
  ) { }

  onSubmit(formData: any)
  {
    this.enableButton = false;

    this.statementService.createFinancialStatement(formData)
      .subscribe({
        next: (response) => {
          this.router.navigate(['/financial-statement']);
        },
        error: (error) =>{
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
