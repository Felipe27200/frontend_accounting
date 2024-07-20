import { Component } from '@angular/core';

import { Router } from '@angular/router';

import { CategoryService } from '@services/category.service';

import { Message, MessageService } from 'primeng/api';


@Component({
  selector: 'app-category-create',
  templateUrl: './category-create.component.html',
  styleUrl: './category-create.component.css',
  providers: [MessageService],
})
export class CategoryCreateComponent {
  enableButton: boolean = true;

  constructor(
    private categoryService: CategoryService,
    private router: Router,
    private messageService: MessageService
  ) { }

  onSubmit(formData: any)
  {
    this.enableButton = false;

    this.categoryService.createCategory(formData)
    .subscribe({
      next: (response: any) => {
        this.router.navigate(["/categories"]);
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

        this.enableButton = true;
    }
    });
  }
}
