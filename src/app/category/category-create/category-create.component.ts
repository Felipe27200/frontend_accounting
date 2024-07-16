import { Component } from '@angular/core';

import { Router } from '@angular/router';

import { CategoryService } from '@services/category.service';

import { MessageService } from 'primeng/api';


@Component({
  selector: 'app-category-create',
  templateUrl: './category-create.component.html',
  styleUrl: './category-create.component.css',
  providers: [MessageService],
})
export class CategoryCreateComponent {
  constructor(
    private categoryService: CategoryService,
    private router: Router,
    private messageService: MessageService
  ) { }

  onSubmit(formData: any)
  {    
    this.categoryService.createCategory(formData)
    .subscribe({
      next: (response: any) => {
        this.router.navigate(["/categories"]);
      },
      error: (error) => {
        if (error.hasOwnProperty("error") && error.error.hasOwnProperty("message"))
          this.messageService.add({ severity: 'error', summary: 'Error', detail: error.error.message });
    }
    });
  }
}
